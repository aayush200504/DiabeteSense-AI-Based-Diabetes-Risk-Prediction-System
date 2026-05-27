"""
DiabetesSense AI — Python ML Backend
Diabetes Risk Prediction using Lifestyle Data (NHANES Dataset)
Type-2 Diabetes + Cardiovascular Disease Comorbidity Analysis

Algorithms: Logistic Regression, Decision Tree, Random Forest, SVM
"""

import warnings
warnings.filterwarnings('ignore')

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import MinMaxScaler, LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, classification_report, confusion_matrix, roc_curve
)
from sklearn.feature_selection import SelectFromModel
import joblib
import os, json

# ─── Paths ──────────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR  = os.path.join(BASE_DIR, 'models')
OUTPUT_DIR = os.path.join(BASE_DIR, 'output')
os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 65)
print("  DiabetesSense AI — ML Training Pipeline")
print("  Diabetes Risk Prediction using NHANES Lifestyle Data")
print("=" * 65)

# ─── 1. SYNTHETIC NHANES-LIKE DATASET GENERATION ────────────────────────────
#   In production, replace with: pd.read_csv('NHANES_data.csv')
#   NHANES features: Age, BMI, HbA1c, Glucose, BP, Waist, Activity, etc.
# ─────────────────────────────────────────────────────────────────────────────

print("\n[1/7] Generating synthetic NHANES-like dataset (21,893 samples)...")

np.random.seed(42)
n = 21893

# Simulate realistic distributions based on NHANES statistics
age        = np.random.normal(47.2, 18.4, n).clip(18, 80)
gender     = np.random.choice([0, 1], n, p=[0.487, 0.513])        # 0=Male, 1=Female
bmi        = np.random.lognormal(np.log(28.5), 0.22, n).clip(15, 67)
waist      = bmi * 3.1 + np.random.normal(0, 6, n)
systolic   = np.random.normal(128.3, 18.7, n).clip(80, 240)
diastolic  = np.random.normal(76.4, 11.2, n).clip(40, 130)
hdl        = np.random.normal(52.4, 14.8, n).clip(15, 130)
ldl        = np.random.normal(118.3, 34.2, n).clip(30, 280)
triglycerides = np.random.lognormal(np.log(145), 0.55, n).clip(25, 1700)
activity   = np.random.exponential(3.2, n).clip(0, 14)
smoking    = np.random.choice([0, 1, 2], n, p=[0.624, 0.218, 0.158])  # Never/Former/Current
diet_score = np.random.normal(52, 13, n).clip(0, 100)
sleep_hrs  = np.random.normal(7.0, 1.3, n).clip(3, 12)
alcohol    = np.random.choice([0, 1, 2], n, p=[0.40, 0.45, 0.15])
race       = np.random.choice([1, 2, 3, 4, 5, 6], n)
poverty    = np.random.normal(2.5, 1.5, n).clip(0, 5)

# Generate HbA1c and Glucose with realistic diabetes correlation
# Probability of diabetes influenced by age, BMI, waist, BP, activity
p_diab = (
    0.003 * (age - 18)
    + 0.015 * (bmi - 25).clip(0, None)
    + 0.001 * (systolic - 120).clip(0, None)
    + 0.02 * smoking
    - 0.01 * activity
    + 0.005 * (waist - 90).clip(0, None) / 5
)
p_diab = np.clip(p_diab, 0.01, 0.9)
diabetes_true = np.random.binomial(1, p_diab, n)

# HbA1c: diabetic=7.2+noise, prediab=5.9+noise, normal=5.2+noise
hba1c = np.where(
    diabetes_true == 1,
    np.random.normal(7.5, 1.2, n).clip(6.5, 14),
    np.where(
        p_diab > 0.3,
        np.random.normal(5.9, 0.5, n).clip(5.7, 6.49),
        np.random.normal(5.2, 0.4, n).clip(3.5, 5.69)
    )
)

# Fasting Glucose (LBXGLU)
glucose = np.where(
    diabetes_true == 1,
    np.random.normal(186, 48, n).clip(126, 500),
    np.random.normal(91, 10, n).clip(55, 125)
)

# Oral Glucose Tolerance Test (LBXGLT)
ogtt = np.where(
    diabetes_true == 1,
    np.random.normal(240, 50, n).clip(200, 600),
    np.random.normal(120, 15, n).clip(70, 199)
)

# Insulin (LBXIN)
insulin = np.where(
    diabetes_true == 1,
    np.random.normal(45, 15, n).clip(20, 150),
    np.random.normal(12, 5, n).clip(2, 25)
)

# ─── Build DataFrame ─────────────────────────────────────────────────────────
df = pd.DataFrame({
    'Age': age, 
    'Gender': gender, 
    'BMI': bmi, 
    'PhysicalActivity': activity, 
    'FastingGlucose': glucose, 
    'Insulin': insulin,
    'OralGlucoseTolerance': ogtt,
    'SmokingStatus': smoking,
    'Diabetes': diabetes_true,
})

# Add 3.2% missing values (realistic for NHANES)
for col in ['BMI', 'FastingGlucose']:
    mask = np.random.rand(n) < 0.032
    df.loc[mask, col] = np.nan

print(f"    ✓ Dataset shape: {df.shape}")
print(f"    ✓ Diabetic rate: {df['Diabetes'].mean()*100:.1f}%")
print(f"    ✓ Missing values: {df.isnull().sum().sum()} total")

# ─── 2. EDA ──────────────────────────────────────────────────────────────────
print("\n[2/7] Performing Exploratory Data Analysis...")

stats = df.describe()
print("\n  Descriptive Statistics (key features):")
print(df[['Age','BMI','FastingGlucose','Insulin','OralGlucoseTolerance']].describe().round(2).to_string())

print(f"\n  Correlation with Diabetes:")
corr = df.corr()['Diabetes'].sort_values(ascending=False)
print(corr.head(10).round(3).to_string())

# ─── 3. PREPROCESSING ────────────────────────────────────────────────────────
print("\n[3/7] Preprocessing pipeline...")

df_clean = df.copy()

# Step 1: Missing value imputation
print("    ► Step 1: Missing value imputation (Median + KNN)")
num_cols = df_clean.select_dtypes(include='number').columns.tolist()
num_cols.remove('Diabetes')
imputer = SimpleImputer(strategy='median')
df_clean[num_cols] = imputer.fit_transform(df_clean[num_cols])

# Step 2: Outlier removal (Skipped for medical data integrity)
print("    ► Step 2: Outlier detection (Skipped)")

# Step 3: Feature Engineering
print("    ► Step 3: Feature engineering")
# Using requested features only

# Step 3: Feature Engineering (Simplified for User Request)
features = [
    'Age', 'Gender', 'BMI', 'PhysicalActivity', 
    'FastingGlucose', 'Insulin', 'OralGlucoseTolerance', 'SmokingStatus'
]

X = df_clean[features]
y = df_clean['Diabetes']
print(f"    ► Step 4: Features selected: {len(features)}")

# ─── 4. TRAIN-TEST SPLIT ────────────────────────────────────────────────────
print("\n[4/7] Train / Validation / Test split (80/10/10 stratified)...")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
X_val, X_test, y_val, y_test = train_test_split(
    X_test, y_test, test_size=0.5, random_state=42, stratify=y_test
)

# Normalization
scaler = MinMaxScaler()
X_train_sc = scaler.fit_transform(X_train)
X_val_sc   = scaler.transform(X_val)
X_test_sc  = scaler.transform(X_test)

print(f"    Train: {X_train.shape[0]} | Val: {X_val.shape[0]} | Test: {X_test.shape[0]}")
print(f"    Diabetic in train: {y_train.sum()} ({y_train.mean()*100:.1f}%)")

# ─── 5. MODEL TRAINING ───────────────────────────────────────────────────────
print("\n[5/7] Training ML models...")

models = {
    'Logistic Regression': LogisticRegression(
        C=0.1, max_iter=1000, class_weight='balanced', solver='lbfgs', random_state=42
    ),
    'Decision Tree': DecisionTreeClassifier(
        max_depth=10, min_samples_leaf=10, class_weight='balanced',
        criterion='gini', random_state=42
    ),
    'Random Forest': RandomForestClassifier(
        n_estimators=500, max_depth=15, min_samples_split=5,
        max_features='sqrt', class_weight='balanced', n_jobs=-1, random_state=42
    ),
    'SVM': SVC(
        C=10, kernel='rbf', gamma=0.01,
        class_weight='balanced', probability=True, random_state=42
    ),
}

results = {}
for name, model in models.items():
    print(f"\n    ⚙️  Training {name}...")
    if name in ['Logistic Regression', 'SVM']:
        model.fit(X_train_sc, y_train)
        y_pred = model.predict(X_test_sc)
        y_prob = model.predict_proba(X_test_sc)[:, 1]
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]

    acc  = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec  = recall_score(y_test, y_pred, zero_division=0)
    f1   = f1_score(y_test, y_pred, zero_division=0)
    auc  = roc_auc_score(y_test, y_prob)
    cm   = confusion_matrix(y_test, y_pred)

    results[name] = {
        'accuracy': round(acc * 100, 2),
        'precision': round(prec * 100, 2),
        'recall': round(rec * 100, 2),
        'f1_score': round(f1 * 100, 2),
        'auc_roc': round(auc, 4),
        'confusion_matrix': cm.tolist(),
    }

    print(f"       Accuracy:  {acc*100:.2f}%")
    print(f"       Precision: {prec*100:.2f}%")
    print(f"       Recall:    {rec*100:.2f}%")
    print(f"       F1-Score:  {f1*100:.2f}%")
    print(f"       AUC-ROC:   {auc:.4f}")

    # Save model
    joblib.dump(model, os.path.join(MODEL_DIR, f'{name.replace(" ","_")}.pkl'))

# ─── 6. BEST MODEL ───────────────────────────────────────────────────────────
print("\n[6/7] Selecting best model...")

best_name = max(results, key=lambda m: results[m]['accuracy'])
print(f"\n  🏆 Best Model: {best_name}")
print(f"     Accuracy:  {results[best_name]['accuracy']}%")
print(f"     AUC-ROC:   {results[best_name]['auc_roc']}")

# Save scaler
joblib.dump(scaler, os.path.join(MODEL_DIR, 'scaler.pkl'))
joblib.dump(features, os.path.join(MODEL_DIR, 'features.pkl'))

# Feature importance (RF)
rf_model = models['Random Forest']
feat_imp = pd.Series(rf_model.feature_importances_, index=features).sort_values(ascending=False)
print(f"\n  Top 5 Features (Random Forest):")
for feat, imp in feat_imp.head(5).items():
    print(f"    {feat:25s}: {imp:.4f} ({imp*100:.1f}%)")

# ─── 7. VISUALIZATIONS ───────────────────────────────────────────────────────
print("\n[7/7] Generating visualizations...")

# 1. Model Comparison Bar Chart
fig, axes = plt.subplots(1, 2, figsize=(14, 5))
fig.patch.set_facecolor('#0D1121')

names  = list(results.keys())
accs   = [results[n]['accuracy']  for n in names]
aucs   = [results[n]['auc_roc']   for n in names]
colors = ['#6366f1', '#8b5cf6', '#10b981', '#06b6d4']

ax = axes[0]
ax.set_facecolor('#080B14')
bars = ax.bar(names, accs, color=colors, alpha=0.85, edgecolor='none', width=0.6)
ax.set_title('Model Accuracy Comparison', color='white', fontsize=13, pad=12)
ax.set_ylabel('Accuracy (%)', color='#94a3b8')
ax.tick_params(colors='#94a3b8')
ax.set_ylim(75, 100)
for bar, v in zip(bars, accs):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3, f'{v:.1f}%',
            ha='center', va='bottom', color='white', fontsize=10, fontweight='bold')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
for sp in ax.spines.values():
    sp.set_color('#1e293b')

ax = axes[1]
ax.set_facecolor('#080B14')
bars = ax.bar(names, [a*100 for a in aucs], color=colors, alpha=0.85, edgecolor='none', width=0.6)
ax.set_title('AUC-ROC Score Comparison', color='white', fontsize=13, pad=12)
ax.set_ylabel('AUC-ROC (×100)', color='#94a3b8')
ax.tick_params(colors='#94a3b8')
ax.set_ylim(80, 100)
for bar, v in zip(bars, aucs):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3, f'{v:.3f}',
            ha='center', va='bottom', color='white', fontsize=10, fontweight='bold')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
for sp in ax.spines.values():
    sp.set_color('#1e293b')

plt.xticks(rotation=15)
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'model_comparison.png'), dpi=150, bbox_inches='tight', facecolor='#0D1121')
plt.close()

# 2. Feature Importance
fig, ax = plt.subplots(figsize=(10, 6))
fig.patch.set_facecolor('#0D1121')
ax.set_facecolor('#080B14')
top10 = feat_imp.head(10)
colors_fi = plt.cm.RdYlGn(np.linspace(0.2, 0.9, len(top10)))[::-1]
bars = ax.barh(top10.index, top10.values, color=colors_fi, alpha=0.85)
ax.set_title('Feature Importance — Random Forest', color='white', fontsize=13)
ax.tick_params(colors='#94a3b8')
ax.set_xlabel('Importance Score', color='#94a3b8')
ax.invert_yaxis()
for b, v in zip(bars, top10.values):
    ax.text(b.get_width() + 0.002, b.get_y() + b.get_height()/2,
            f'{v:.3f}', va='center', color='white', fontsize=9)
for sp in ax.spines.values():
    sp.set_color('#1e293b')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'feature_importance.png'), dpi=150, bbox_inches='tight', facecolor='#0D1121')
plt.close()

# 3. ROC Curve
fig, ax = plt.subplots(figsize=(8, 6))
fig.patch.set_facecolor('#0D1121')
ax.set_facecolor('#080B14')
for (name, model), color in zip(models.items(), ['#6366f1','#8b5cf6','#10b981','#06b6d4']):
    if name in ['Logistic Regression', 'SVM']:
        y_prob = model.predict_proba(X_test_sc)[:, 1]
    else:
        y_prob = model.predict_proba(X_test)[:, 1]
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    auc = results[name]['auc_roc']
    ax.plot(fpr, tpr, color=color, linewidth=2.5, label=f'{name} (AUC={auc})')
ax.plot([0,1],[0,1],'--', color='#475569', linewidth=1.5)
ax.set_xlabel('False Positive Rate', color='#94a3b8')
ax.set_ylabel('True Positive Rate', color='#94a3b8')
ax.set_title('ROC Curves — All Models', color='white', fontsize=13)
ax.legend(framealpha=0.2, facecolor='#1e293b', labelcolor='white', fontsize=10)
ax.tick_params(colors='#94a3b8')
for sp in ax.spines.values():
    sp.set_color('#1e293b')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'roc_curves.png'), dpi=150, bbox_inches='tight', facecolor='#0D1121')
plt.close()

# 4. Confusion Matrix (RF)
rf = models['Random Forest']
y_pred_rf = rf.predict(X_test)
cm = confusion_matrix(y_test, y_pred_rf)
fig, ax = plt.subplots(figsize=(6, 5))
fig.patch.set_facecolor('#0D1121')
ax.set_facecolor('#080B14')
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Predicted No', 'Predicted Yes'],
            yticklabels=['Actual No', 'Actual Yes'],
            ax=ax, annot_kws={'size': 14, 'weight': 'bold', 'color': 'white'},
            linewidths=2, linecolor='#0D1121')
ax.set_title('Confusion Matrix — Random Forest', color='white', fontsize=13)
ax.tick_params(colors='#94a3b8')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'confusion_matrix.png'), dpi=150, bbox_inches='tight', facecolor='#0D1121')
plt.close()

# 5. Distribution Plot (Insulin & Glucose)
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.patch.set_facecolor('#0D1121')
for ax, col, c in zip(axes, ['Insulin', 'FastingGlucose'], ['#6366f1', '#ef4444']):
    ax.set_facecolor('#080B14')
    ax.hist(df_clean[df_clean['Diabetes']==0][col], bins=40, alpha=0.6, color='#10b981', label='Non-Diabetic', density=True)
    ax.hist(df_clean[df_clean['Diabetes']==1][col], bins=40, alpha=0.6, color='#ef4444',  label='Diabetic',    density=True)
    ax.set_xlabel(col, color='#94a3b8')
    ax.set_ylabel('Density', color='#94a3b8')
    ax.set_title(f'{col} Distribution by Diabetes Status', color='white', fontsize=12)
    ax.legend(framealpha=0.2, facecolor='#1e293b', labelcolor='white')
    ax.tick_params(colors='#94a3b8')
    for sp in ax.spines.values():
        sp.set_color('#1e293b')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'distributions.png'), dpi=150, bbox_inches='tight', facecolor='#0D1121')
plt.close()

print("    ✓ Saved: model_comparison.png")
print("    ✓ Saved: feature_importance.png")
print("    ✓ Saved: roc_curves.png")
print("    ✓ Saved: confusion_matrix.png")
print("    ✓ Saved: distributions.png")

# ─── 8. SAVE RESULTS ─────────────────────────────────────────────────────────
with open(os.path.join(OUTPUT_DIR, 'results.json'), 'w') as f:
    json.dump(results, f, indent=2)

print("\n" + "=" * 65)
print("  ✅ TRAINING COMPLETE!")
print(f"  🏆 Best Model:    {best_name}")
print(f"  📊 Accuracy:      {results[best_name]['accuracy']}%")
print(f"  📈 AUC-ROC:       {results[best_name]['auc_roc']}")
print(f"  💾 Models saved:  backend/models/")
print(f"  📸 Plots saved:   backend/output/")
print("=" * 65)

# ─── 9. PREDICTION FUNCTION (for FastAPI) ───────────────────────────────────

def predict_risk(patient_data: dict) -> dict:
    """
    Predict diabetes risk for a single patient.
    patient_data: dict with feature keys matching 'features' list
    Returns: dict with risk_score, diagnosis, confidence
    """
    rf = joblib.load(os.path.join(MODEL_DIR, 'Random_Forest.pkl'))
    
    # Build feature vector
    vals = [patient_data.get(f, 0) for f in features]
    X_input = np.array(vals).reshape(1, -1)
    
    prob = rf.predict_proba(X_input)[0][1]
    pred = rf.predict(X_input)[0]
    
    if prob >= 0.65:
        diagnosis = "Type-2 Diabetes"
        risk_level = "High"
    elif prob >= 0.4:
        diagnosis = "Pre-Diabetes"
        risk_level = "Moderate"
    else:
        diagnosis = "No Diabetes"
        risk_level = "Low"
    
    return {
        'risk_score': round(prob * 100, 1),
        'risk_level': risk_level,
        'diagnosis': diagnosis,
        'confidence': round(max(prob, 1 - prob) * 100, 1),
        'model': 'Random Forest',
    }

print("\n  Prediction function ready. Example:")
example = {
    'Age': 55, 'Gender': 1, 'BMI': 31.2, 
    'FastingGlucose': 168, 'Insulin': 45, 'OralGlucoseTolerance': 240,
    'PhysicalActivity': 1, 'SmokingStatus': 1
}
result = predict_risk(example)
print(f"  Sample Patient → Risk: {result['risk_level']} ({result['risk_score']}%), Diagnosis: {result['diagnosis']}")
print(f"  Confidence: {result['confidence']}%")
