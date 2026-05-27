// ============================================================
// Mock data for DiabetesSense AI Dashboard
// Based on NHANES dataset characteristics
// ============================================================

export const NHANES_STATS = {
  totalSamples: 21893,
  features: 22,
  diabeticPatients: 4780,
  preDiabetic: 3210,
  cardiovascular: 6420,
  cleanedSamples: 20456,
};

export const statsCards = [
  { label: "Total Patients", value: "21,893", change: "+12.4%", up: true, color: "primary" },
  { label: "Diabetic Cases", value: "4,780",  change: "+8.2%",  up: true, color: "danger"  },
  { label: "Pre-Diabetic",   value: "3,210",  change: "+5.1%",  up: true, color: "warning" },
  { label: "Model Accuracy", value: "94.7%",  change: "+2.3%",  up: true, color: "success" },
];

export const modelAccuracy = [
  { name: "Logistic Regression", accuracy: 82.4, precision: 80.1, recall: 78.9, f1: 79.5, auc: 0.87, color: "#6366f1" },
  { name: "Decision Tree",       accuracy: 87.6, precision: 85.3, recall: 86.2, f1: 85.7, auc: 0.89, color: "#8b5cf6" },
  { name: "Random Forest",       accuracy: 94.7, precision: 93.1, recall: 92.8, f1: 92.9, auc: 0.97, color: "#10b981" },
  { name: "SVM",                 accuracy: 91.2, precision: 89.5, recall: 88.7, f1: 89.1, auc: 0.94, color: "#06b6d4" },
];

export const featureImportance = [
  { feature: "HbA1c Level",        importance: 0.342, category: "Biochemical"  },
  { feature: "Blood Glucose",      importance: 0.289, category: "Biochemical"  },
  { feature: "BMI",                importance: 0.198, category: "Anthropometric" },
  { feature: "Age",                importance: 0.167, category: "Demographic"  },
  { feature: "Physical Activity",  importance: 0.143, category: "Lifestyle"    },
  { feature: "Waist Circumference",importance: 0.128, category: "Anthropometric" },
  { feature: "Systolic BP",        importance: 0.115, category: "Cardiovascular" },
  { feature: "Diastolic BP",       importance: 0.098, category: "Cardiovascular" },
  { feature: "Smoking Status",     importance: 0.087, category: "Lifestyle"    },
  { feature: "Diet Quality",       importance: 0.076, category: "Lifestyle"    },
];

export const monthlyTrend = [
  { month: "Aug",  predictions: 1240, diabetic: 280, normal: 960  },
  { month: "Sep",  predictions: 1580, diabetic: 340, normal: 1240 },
  { month: "Oct",  predictions: 1820, diabetic: 410, normal: 1410 },
  { month: "Nov",  predictions: 2100, diabetic: 490, normal: 1610 },
  { month: "Dec",  predictions: 1960, diabetic: 465, normal: 1495 },
  { month: "Jan",  predictions: 2340, diabetic: 545, normal: 1795 },
  { month: "Feb",  predictions: 2680, diabetic: 610, normal: 2070 },
  { month: "Mar",  predictions: 2890, diabetic: 680, normal: 2210 },
];

export const ageDistribution = [
  { age: "20-29", count: 2140, diabetic: 89  },
  { age: "30-39", count: 3280, diabetic: 210 },
  { age: "40-49", count: 4120, diabetic: 520 },
  { age: "50-59", count: 5380, diabetic: 980 },
  { age: "60-69", count: 4210, diabetic: 1450},
  { age: "70+",   count: 2763, diabetic: 1531},
];

export const bmiDistribution = [
  { range: "Underweight (<18.5)",   count: 640,  risk: "Low"      },
  { range: "Normal (18.5-24.9)",    count: 5820, risk: "Low"      },
  { range: "Overweight (25-29.9)",  count: 7340, risk: "Moderate" },
  { range: "Obese I (30-34.9)",     count: 4980, risk: "High"     },
  { range: "Obese II (35-39.9)",    count: 2140, risk: "Very High"},
  { range: "Obese III (≥40)",       count: 973,  risk: "Extreme"  },
];

export const correlationData = [
  { x: 18, y: 4.2, feature: "BMI 18", bmi: 18  },
  { x: 22, y: 4.8, feature: "BMI 22", bmi: 22  },
  { x: 25, y: 5.1, feature: "BMI 25", bmi: 25  },
  { x: 28, y: 5.6, feature: "BMI 28", bmi: 28  },
  { x: 30, y: 6.2, feature: "BMI 30", bmi: 30  },
  { x: 33, y: 6.8, feature: "BMI 33", bmi: 33  },
  { x: 36, y: 7.4, feature: "BMI 36", bmi: 36  },
  { x: 40, y: 8.1, feature: "BMI 40", bmi: 40  },
  { x: 44, y: 9.2, feature: "BMI 44", bmi: 44  },
];

export const confusionMatrix = {
  tp: 4521, fp: 259, fn: 312, tn: 15361
};

export const riskDistribution = [
  { name: "Low Risk",    value: 13903, color: "#10b981" },
  { name: "Pre-Diabetic",value: 3210,  color: "#f59e0b" },
  { name: "Type-2 Diab", value: 4780,  color: "#ef4444" },
];

export const statsTable = [
  { feature: "Age",                mean: "47.2",  median: "46",   std: "18.4", min: "18",  max: "80",  skew: "0.24"  },
  { feature: "BMI",                mean: "29.1",  median: "28.3", std: "6.8",  min: "16.2",max: "67.3",skew: "0.89"  },
  { feature: "HbA1c",              mean: "5.8",   median: "5.6",  std: "1.3",  min: "3.5", max: "14.2",skew: "1.42"  },
  { feature: "Blood Glucose",      mean: "121.4", median: "108",  std: "45.2", min: "55",  max: "500", skew: "1.78"  },
  { feature: "Systolic BP",        mean: "128.3", median: "126",  std: "18.7", min: "80",  max: "240", skew: "0.56"  },
  { feature: "Physical Activity",  mean: "3.2",   median: "3",    std: "2.1",  min: "0",   max: "10",  skew: "-0.21" },
  { feature: "Waist Circumference",mean: "97.4",  median: "96.1", std: "15.3", min: "62",  max: "172", skew: "0.43"  },
];

export const preprocessingSteps = [
  { step: "Missing Value Imputation", detail: "Mean/Median imputation for 3.2% missing values", status: "done", samples: "21,893 → 21,893" },
  { step: "Outlier Detection",        detail: "IQR method + Z-score (|z|>3), 6.8% removed",     status: "done", samples: "21,893 → 20,456" },
  { step: "Feature Encoding",         detail: "Label encoding for gender; One-hot for race",     status: "done", samples: "22 → 28 features" },
  { step: "Normalization",            detail: "MinMax scaling for 12 continuous features",       status: "done", samples: "All ranges → [0,1]"  },
  { step: "Feature Selection",        detail: "Random Forest importance + correlation filter",   status: "done", samples: "28 → 15 features"   },
  { step: "SMOTE Balancing",          detail: "Oversampling minority class (diabetic) 1:2 ratio",status: "done", samples: "20,456 → 24,320"    },
  { step: "Train-Test Split",         detail: "80% train / 10% val / 10% test, stratified",     status: "done", samples: "Train:19,456 Test:2,432"},
];

export const ganttData = [
  { task: "Literature Survey",     start: 0,  duration: 4, color: "#6366f1" },
  { task: "Problem Formulation",   start: 2,  duration: 2, color: "#8b5cf6" },
  { task: "Dataset Collection",    start: 3,  duration: 3, color: "#06b6d4" },
  { task: "Data Preprocessing",    start: 5,  duration: 4, color: "#10b981" },
  { task: "Exploratory Analysis",  start: 7,  duration: 3, color: "#f59e0b" },
  { task: "Model Development",     start: 9,  duration: 5, color: "#ef4444" },
  { task: "Model Evaluation",      start: 13, duration: 3, color: "#f43f5e" },
  { task: "Dashboard Development", start: 14, duration: 4, color: "#f97316" },
  { task: "Testing & Validation",  start: 17, duration: 2, color: "#10b981" },
  { task: "Documentation",         start: 18, duration: 2, color: "#6366f1" },
];

export const recentPredictions = [
  { id: "P-1042", age: 54, bmi: 32.1, hba1c: 7.2, glucose: 186, risk: "High",    confidence: 94, type: "Type-2"    },
  { id: "P-1043", age: 38, bmi: 24.8, hba1c: 5.1, glucose: 98,  risk: "Low",     confidence: 97, type: "No Risk"   },
  { id: "P-1044", age: 62, bmi: 35.4, hba1c: 8.1, glucose: 212, risk: "High",    confidence: 96, type: "Type-2+CVD"},
  { id: "P-1045", age: 45, bmi: 27.2, hba1c: 5.9, glucose: 124, risk: "Moderate",confidence: 81, type: "Pre-Diab"  },
  { id: "P-1046", age: 29, bmi: 22.1, hba1c: 4.8, glucose: 88,  risk: "Low",     confidence: 98, type: "No Risk"   },
  { id: "P-1047", age: 71, bmi: 29.8, hba1c: 6.8, glucose: 168, risk: "High",    confidence: 92, type: "Type-2+CVD"},
];

export const researchPapers = [
  { sno: 1,  title: "Prediction of Type 2 Diabetes Using Machine Learning",          author: "Xue et al.",       year: 2021, journal: "Nature Medicine",       method: "Random Forest",     finding: "94% accuracy using lifestyle + biochemical features" },
  { sno: 2,  title: "Deep Learning for Diabetes Risk Stratification",                author: "Zou et al.",       year: 2022, journal: "Lancet Digital Health", method: "CNN+LSTM",          finding: "AUC 0.96 on EHR data" },
  { sno: 3,  title: "SVM for Early Type 2 Diabetes Detection",                      author: "Kavakiotis et al.",year: 2017, journal: "Healthcare",            method: "SVM",               finding: "Early detection 89% accuracy" },
  { sno: 4,  title: "Decision Trees in Clinical Diabetes Prediction",                author: "Chang et al.",     year: 2019, journal: "JAMIA",                 method: "Decision Tree",     finding: "Interpretable model for clinicians" },
  { sno: 5,  title: "Lifestyle Factors as Predictors of T2DM",                      author: "Malik et al.",     year: 2020, journal: "BMJ Open",              method: "Logistic Reg.",     finding: "Physical inactivity increases risk 40%" },
  { sno: 6,  title: "NHANES Data for Metabolic Disease Prediction",                 author: "Johnson et al.",   year: 2021, journal: "PLoS ONE",              method: "Ensemble",          finding: "Population-level risk estimation" },
  { sno: 7,  title: "Cardiovascular Risk in Diabetic Patients — ML Analysis",       author: "Mohan et al.",     year: 2022, journal: "Circ. Research",        method: "Gradient Boost",    finding: "CVD + T2DM comorbidity model 92%" },
  { sno: 8,  title: "Feature Selection Methods for Diabetes Prediction",             author: "Sisodia et al.",   year: 2018, journal: "Procedia Computer Sci.",method: "PCA + RF",          finding: "15 key features identified" },
  { sno: 9,  title: "Comparison of ML Algorithms for Diabetes Diagnosis",           author: "Pima et al.",      year: 2019, journal: "IJMIA",                 method: "Comparative",       finding: "RF outperforms all other models" },
  { sno: 10, title: "HbA1c as Primary Biomarker in Diabetes Screening",             author: "ADA Study",        year: 2020, journal: "Diabetes Care",         method: "Statistical",       finding: "HbA1c ≥6.5% diagnostic threshold" },
  { sno: 11, title: "Obesity BMI Correlation with T2DM Onset",                      author: "Must et al.",      year: 2021, journal: "Obesity Reviews",       method: "Cohort Study",      finding: "BMI > 30 triples diabetes risk" },
  { sno: 12, title: "Physical Activity and Diabetes Prevention",                    author: "Hu et al.",        year: 2022, journal: "NEJM",                  method: "RCT",               finding: "150min/week activity reduces risk 58%" },
  { sno: 13, title: "Transfer Learning for Healthcare Prediction",                  author: "Rajpurkar et al.", year: 2021, journal: "Nature",                method: "Transfer Learning", finding: "Pre-trained models improve accuracy" },
  { sno: 14, title: "Explainable AI for Diabetes Risk Models",                      author: "Tonekaboni et al.",year: 2022, journal: "CHIL",                  method: "SHAP + LIME",       finding: "Black-box to interpretable models" },
  { sno: 15, title: "Federated Learning for Privacy-Preserving Diabetes Pred.",     author: "Rieke et al.",     year: 2020, journal: "npj Digital Medicine",   method: "Federated ML",      finding: "Privacy maintained with same accuracy" },
  { sno: 16, title: "Blood Pressure as Comorbidity Marker in Diabetes",             author: "Williams et al.",  year: 2021, journal: "Hypertension",          method: "Multivariate",      finding: "HTN in 73% of T2DM patients" },
  { sno: 17, title: "LLMs for Diabetes Patient Communication",                      author: "Singhal et al.",   year: 2023, journal: "NEJM AI",               method: "GPT-4 Eval.",       finding: "LLMs match clinician advice quality" },
  { sno: 18, title: "SMOTE for Imbalanced Diabetes Datasets",                       author: "Chawla et al.",    year: 2019, journal: "JAIR",                  method: "Data Augmentation", finding: "Recall increased by 18% post-SMOTE" },
  { sno: 19, title: "Retinal Image Based Diabetes Screening",                       author: "Gulshan et al.",   year: 2019, journal: "JAMA",                  method: "Deep CNN",          finding: "Sensitivity 97.5% for diabetic retino." },
  { sno: 20, title: "National Diabetes Prevention Program Evaluation",              author: "CDC Study",        year: 2021, journal: "Prev. Chronic Dis.",     method: "Epidemiological",   finding: "5-7% weight loss prevents progression" },
  { sno: 21, title: "XGBoost for Clinical Risk Prediction",                         author: "Chen et al.",      year: 2022, journal: "KDD",                   method: "XGBoost",           finding: "State-of-art on structured health data" },
  { sno: 22, title: "Genetic Risk Factors Combined with Lifestyle for T2DM Pred.", author: "McCarthy et al.",  year: 2021, journal: "Nature Genetics",        method: "Polygenic Risk",    finding: "Genetic + lifestyle = best predictor" },
  { sno: 23, title: "Real-World Evidence in Diabetes ML Studies",                   author: "Liu et al.",       year: 2022, journal: "Diabetes Technol.",      method: "EHR Analysis",      finding: "RWE improves generalizability" },
  { sno: 24, title: "Multi-modal Data Fusion for Diabetes Detection",               author: "Guo et al.",       year: 2023, journal: "IEEE TBIOM",            method: "Fusion Network",    finding: "Multi-modal outperforms single 8%" },
  { sno: 25, title: "Comparative Analysis: Logistic Reg. vs Neural Network",       author: "Acar et al.",      year: 2020, journal: "J. Biomed. Inf.",        method: "Comparative",       finding: "LR baseline still competitive" },
  { sno: 26, title: "Population Health Analytics Using NHANES",                     author: "Ostchega et al.",  year: 2021, journal: "NCHS Data Brief",        method: "Descriptive",       finding: "10.5% US adults have T2DM" },
  { sno: 27, title: "Class Imbalance Strategies in Medical ML",                     author: "He et al.",        year: 2020, journal: "IEEE TNNLS",            method: "Survey",            finding: "SMOTE+Ensemble best for medical data" },
  { sno: 28, title: "Automated ML Pipelines for Disease Prediction",               author: "Feurer et al.",    year: 2021, journal: "AutoML Book (Springer)", method: "AutoML",            finding: "Auto-sklearn competitive with manual" },
  { sno: 29, title: "Clinical NLP for Diabetes Risk from Notes",                   author: "Ghassemi et al.", year: 2022, journal: "JAMIA",                  method: "BERT NLP",          finding: "Unstructured notes add 6% accuracy" },
  { sno: 30, title: "Continuous Glucose Monitoring + ML Prediction",               author: "Maahs et al.",     year: 2022, journal: "Diabetes Spectrum",      method: "LSTM Time-Series",  finding: "CGM data enables 4-hour ahead pred." },
];
