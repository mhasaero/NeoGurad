from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Load Model
# Kita menggunakan path relatif karena di serverless strukturnya bisa berubah
model_path = os.path.join(os.path.dirname(__file__), 'model.joblib')
model = None

# Load model di luar request agar "Warm Start" (lebih cepat)
try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
    else:
        print("Model file not found at:", model_path)
except Exception as e:
    print(f"Error loading model: {e}")

class PatientInput(BaseModel):
    Birth_Weight_kg: float
    Gestational_Age_weeks: int
    Maternal_Age_years: int
    Antenatal_Visits: int
    Breastfeeding_Initiation_hrs: int
    Delivery_Complications: str
    Place_of_Delivery: str

@app.get("/api/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/api/predict")
def predict(data: PatientInput):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded on server")

    try:
        # --- PREPROCESSING (Sama seperti sebelumnya) ---
        dc_preeclampsia = 1 if data.Delivery_Complications == "Preeclampsia" else 0
        dc_sepsis = 1 if data.Delivery_Complications == "Sepsis" else 0
        pd_home = 1 if data.Place_of_Delivery == "Home" else 0
        pd_hospital = 1 if data.Place_of_Delivery == "Hospital" else 0

        input_features = np.array([[
            data.Birth_Weight_kg,
            data.Gestational_Age_weeks,
            data.Maternal_Age_years,
            data.Antenatal_Visits,
            data.Breastfeeding_Initiation_hrs,
            dc_preeclampsia,
            dc_sepsis,
            pd_home,
            pd_hospital
        ]])

        prediction = model.predict(input_features)[0]
        probability_died = model.predict_proba(input_features)[0][1]
        result_label = "Died" if prediction == 1 else "Alive"
        
        return {
            "prediction": result_label,
            "risk_score": float(probability_died)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))