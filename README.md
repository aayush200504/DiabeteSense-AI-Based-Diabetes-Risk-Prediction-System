# DiabetesSense AI — Diabetes Risk Prediction System

> DSBDA Mini Project | Review-1 | Academic Year 2025–26  
> Type-2 Diabetes Risk Prediction using NHANES Lifestyle Data

---

# 🏥 Project Overview

DiabetesSense AI is a Machine Learning-based healthcare analytics system developed to predict the risk of **Type-2 Diabetes** and **Cardiovascular Disease (CVD) comorbidity** using lifestyle and biochemical data from the **NHANES (National Health and Nutrition Examination Survey)** dataset provided by the CDC.

The project combines:
- Data Science
- Machine Learning
- Statistical Analysis
- Explainable AI (XAI)
- Interactive Data Visualization

to support early disease risk assessment and preventive healthcare decision-making.

---

# 📁 Project Structure

```bash
PROJECT/
├── frontend/                    # React + Vite Dashboard
│   ├── src/
│   │   ├── App.jsx              # Main app router
│   │   ├── index.css            # Global design system
│   │   ├── components/
│   │   │   └── Sidebar.jsx      # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RiskPredictor.jsx
│   │   │   ├── DatasetPage.jsx
│   │   │   ├── StatisticalAnalysis.jsx
│   │   │   ├── Visualizations.jsx
│   │   │   ├── MLModels.jsx
│   │   │   ├── SystemDesign.jsx
│   │   │   ├── LiteratureSurvey.jsx
│   │   │   └── ProjectTimeline.jsx
│   │   └── data/
│   │       └── mockData.js
│   └── package.json
│
└── backend/                     # Python ML Pipeline
    ├── ml_pipeline.py
    └── requirements.txt
```

---

# 🚀 Running the Dashboard

## 1️⃣ Navigate to Frontend

```bash
cd frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start Development Server

```bash
npm run dev
```

## 4️⃣ Open Browser

```bash
http://localhost:5173
```

---

# 🐍 Running the ML Pipeline

## Install Python Dependencies

```bash
pip install -r backend/requirements.txt
```

## Run ML Training Pipeline

```bash
python backend/ml_pipeline.py
```

---

# 🎯 Dashboard Pages

| Page | Description |
|------|-------------|
| Overview | KPI cards, trend analysis, model comparison, recent predictions |
| Risk Predictor | Interactive patient input with real-time ML prediction |
| Dataset & Preprocessing | NHANES statistics, feature dictionary, preprocessing pipeline |
| Statistical Analysis | Correlation heatmaps, variance analysis, descriptive statistics |
| Data Visualizations | Histograms, scatter plots, radar charts, feature importance |
| ML Models | Algorithm comparison, confusion matrix, ROC curve analysis |
| System Design | DFD Level 0–3, flowcharts, architecture diagrams |
| Literature Survey | 30 research papers with filtering and search |
| Project Timeline | Gantt chart, feasibility analysis, risk assessment |

---

# 🤖 Machine Learning Algorithms

| Algorithm | Accuracy | AUC-ROC |
|-----------|-----------|----------|
| Logistic Regression | 82.4% | 0.87 |
| Decision Tree | 87.6% | 0.89 |
| Random Forest ⭐ | 94.7% | 0.97 |
| SVM | 91.2% | 0.94 |

✅ **Random Forest achieved the highest accuracy and was selected as the final production model.**

---

# 📊 Dataset Information

| Attribute | Details |
|------------|---------|
| Source | NHANES (CDC) |
| Dataset Type | Healthcare & Lifestyle Data |
| Samples | 21,893 Patient Records |
| Features | 22 Lifestyle + Biochemical Variables |
| Target Classes | No Diabetes / Pre-Diabetic / Type-2 Diabetes |
| Years Covered | 2013–2020 NHANES Cycles |

---

# 🧪 Features Used

- Age
- BMI
- Fasting Glucose
- OGTT
- Insulin Levels
- Physical Activity
- Blood Pressure
- Cholesterol
- Lifestyle Habits
- Clinical Health Indicators

---

# 📈 Key Features

- Real-Time Diabetes Risk Prediction
- Statistical Data Analysis
- ROC Curve & Confusion Matrix Evaluation
- Explainable AI (XAI)
- Feature Importance Visualization
- Multi-Model Benchmarking
- Interactive Healthcare Dashboard
- Literature Survey Integration
- Glassmorphism UI Design

---

# 🏗️ Tech Stack

| Component | Technology |
|------------|-------------|
| Frontend | React 18 + Vite 7 |
| Charts | Recharts |
| Styling | Vanilla CSS (Glassmorphism) |
| Backend | Python |
| ML Framework | scikit-learn |
| Data Processing | Pandas + NumPy |
| Future API | FastAPI |

---

# 🔬 System Workflow

1. Data Collection from NHANES Dataset  
2. Data Cleaning & Preprocessing  
3. Feature Selection & Statistical Analysis  
4. ML Model Training & Evaluation  
5. Real-Time Prediction System  
6. Explainable AI Visualization  
7. Dashboard Reporting & Monitoring  

---

# 📌 Future Scope

- FastAPI Backend Integration
- Real-Time Cloud Deployment
- Deep Learning Model Support
- Mobile Health Monitoring
- Electronic Health Record (EHR) Integration
- Personalized Health Recommendations

---

# 👨‍🎓 Academic Information

| Field | Details |
|-------|----------|
| Subject | Data Science and Big Data Analytics (DSBDA) |
| Project Type | Mini Project Review-1 |
| Academic Year | 2025–26 |
| Focus Area | Type-2 Diabetes + CVD Comorbidity Prediction |

---

# 📷 Screenshots

> Add dashboard screenshots here

```md
![Dashboard](screenshots/dashboard.png)
![Prediction](screenshots/predictor.png)
![ROC Curve](screenshots/roc.png)
```

---

# ⭐ Conclusion

DiabetesSense AI demonstrates how Machine Learning and Data Science can support preventive healthcare through early diabetes risk detection. By combining healthcare analytics, explainable AI, and interactive visualization, the system provides a scalable and intelligent healthcare prediction platform.

---

# 📜 License

This project is developed for academic and educational purposes under DSBDA coursework.

---

# 🙌 Acknowledgements

- CDC NHANES Dataset
- scikit-learn
- React + Vite
- Recharts
- Open Source Healthcare Research Community
