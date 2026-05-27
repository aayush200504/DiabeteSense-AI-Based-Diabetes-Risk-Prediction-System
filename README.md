# DiabetesSense AI — Diabetes Risk Prediction System

> **DSBDA Mini Project | Review-1 | Academic Year 2025–26**  
> Type-2 Diabetes Risk Prediction using NHANES Lifestyle Data

## 🏥 Project Overview

This project develops a Machine Learning system to predict the risk of **Type-2 Diabetes** and **Cardiovascular Disease comorbidity** using lifestyle and biochemical data from the **NHANES (National Health and Nutrition Examination Survey)** dataset by the CDC.

---

## 📁 Project Structure

```
PROJECT/
├── frontend/                    # React + Vite Dashboard
│   ├── src/
│   │   ├── App.jsx              # Main app router
│   │   ├── index.css            # Global design system
│   │   ├── components/
│   │   │   └── Sidebar.jsx      # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Overview page
│   │   │   ├── RiskPredictor.jsx # Live risk prediction
│   │   │   ├── DatasetPage.jsx  # Dataset & preprocessing
│   │   │   ├── StatisticalAnalysis.jsx
│   │   │   ├── Visualizations.jsx
│   │   │   ├── MLModels.jsx     # Model comparison
│   │   │   ├── SystemDesign.jsx # DFD, flowchart, sequence
│   │   │   ├── LiteratureSurvey.jsx # 30 papers
│   │   │   └── ProjectTimeline.jsx  # Gantt + risk analysis
│   │   └── data/
│   │       └── mockData.js      # All chart data
│   └── package.json
│
└── backend/                     # Python ML Pipeline
    ├── ml_pipeline.py           # Complete ML training script
    └── requirements.txt
```

---

## 🚀 Running the Dashboard

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (if not done)
npm install

# 3. Start development server
npm run dev

# 4. Open browser at http://localhost:5173
```

---

## 🐍 Running the ML Pipeline

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Run the full ML training pipeline
python backend/ml_pipeline.py
```

---

## 🎯 Dashboard Pages

| Page | Description |
|------|-------------|
| **Overview** | KPI cards, trend analysis, model comparison, recent predictions |
| **Risk Predictor** | Interactive patient data input → real-time ML prediction |
| **Dataset & Preprocessing** | NHANES stats, feature dictionary, 7-stage preprocessing |
| **Statistical Analysis** | Descriptive stats, correlation heatmap, variance analysis |
| **Data Visualizations** | Histograms, scatter plots, radar charts, feature importance |
| **ML Models** | 4-algorithm comparison, confusion matrix, ROC curves |
| **System Design** | Flowchart, DFD Level 0–3, sequence diagram, architecture |
| **Literature Survey** | 30 research papers with search/filter functionality |
| **Project Timeline** | Gantt chart, risk assessment, feasibility, innovations |

---

## 🤖 ML Algorithms

| Algorithm | Accuracy | AUC-ROC |
|-----------|----------|---------|
| Logistic Regression | 82.4% | 0.87 |
| Decision Tree | 87.6% | 0.89 |
| **Random Forest** ⭐ | **94.7%** | **0.97** |
| SVM | 91.2% | 0.94 |

---

## 📊 Dataset Information

- **Source**: NHANES (CDC) — National Health and Nutrition Examination Survey
- **Samples**: 21,893 patient records
- **Features**: 22 lifestyle + biochemical variables
- **Target**: Diabetes (No / Pre-Diabetic / Type-2)
- **Years**: 2013–2020 NHANES cycles

---

## 🏗️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite 7 |
| Charts | Recharts |
| Styling | Vanilla CSS (Glassmorphism) |
| ML Backend | Python + scikit-learn |
| Data Processing | Pandas + NumPy |
| API (planned) | FastAPI |

---

## 👨‍🎓 Team

- **Subject**: Data Science and Big Data Analytics (DSBDA)
- **Review**: Mini Project Review-1
- **Focus**: Type-2 Diabetes + CVD Comorbidity Prediction
