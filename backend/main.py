from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="DiabetesSense AI Backend")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

try:
    model = joblib.load(os.path.join(MODEL_DIR, "Random_Forest.pkl"))
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
    features = joblib.load(os.path.join(MODEL_DIR, "features.pkl"))
except Exception as e:
    print(f"Error loading models: {e}")
    model = None

class PatientData(BaseModel):
    Age: float
    Gender: int
    BMI: float
    PhysicalActivity: float
    FastingGlucose: float
    Insulin: float
    OralGlucoseTolerance: float
    SmokingStatus: int

@app.get("/")
def read_root():
    return {"message": "DiabetesSense AI API is running"}

@app.post("/predict")
def predict(data: PatientData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Prepare input
    input_dict = data.dict()
    input_vals = [input_dict.get(f, 0) for f in features]
    X_input = np.array(input_vals).reshape(1, -1)
    
    # Probability and Prediction
    prob = model.predict_proba(X_input)[0][1]
    
    # Risk Level
    if prob >= 0.65:
        risk_level = "High"
        diagnosis = "Type-2 Diabetes"
    elif prob >= 0.4:
        risk_level = "Moderate"
        diagnosis = "Pre-Diabetes"
    else:
        risk_level = "Low"
        diagnosis = "No Diabetes"

    # Explainable AI (XAI) - Simple contribution analysis
    # We compare current input to "average" healthy patient
    contributions = []
    # Average healthy values (approximate from NHANES)
    averages = {
        'BMI': 24,
        'FastingGlucose': 90,
        'Insulin': 10,
        'OralGlucoseTolerance': 110,
        'Age': 35
    }
    
    for feat in ['BMI', 'FastingGlucose', 'Insulin', 'OralGlucoseTolerance', 'Age']:
        if feat in input_dict:
            val = input_dict[feat]
            avg = averages.get(feat, val)
            diff = val - avg
            if diff > 0:
                # Basic scaling for visualization
                impact = min(100, (diff / avg) * 50)
                contributions.append({"feature": feat, "impact": round(impact, 1)})

    contributions = sorted(contributions, key=lambda x: x['impact'], reverse=True)

    return {
        "risk_score": round(prob * 100, 1),
        "risk_level": risk_level,
        "diagnosis": diagnosis,
        "confidence": round(max(prob, 1-prob) * 100, 1),
        "contributions": contributions[:3] # Top 3 risk drivers
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
