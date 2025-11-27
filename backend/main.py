from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal

app = FastAPI()

# 1. Konfigurasi CORS (Agar bisa diakses Next.js)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load Model
# Pastikan file 'model.joblib' ada di folder yang sama dengan main.py
try:
    model = joblib.load("model.joblib")
    print("Model berhasil dimuat.")
except Exception as e:
    print(f"Error memuat model: {e}")

# 3. Definisikan Schema Input
# Kita menggunakan Literal untuk membatasi input agar sesuai dengan kategori di dataset
class PatientInput(BaseModel):
    Birth_Weight_kg: float
    Gestational_Age_weeks: int
    Maternal_Age_years: int
    Antenatal_Visits: int
    Breastfeeding_Initiation_hrs: int
    
    # Kategori sesuai dataset (Sepsis, Asphyxia, Preeclampsia)
    # Kita tambahkan 'None' untuk data yang kosong/NaN/Normal
    Delivery_Complications: Literal['Sepsis', 'Asphyxia', 'Preeclampsia', 'None'] 
    
    # Kategori tempat lahir (Hospital, Clinic, Home)
    Place_of_Delivery: Literal['Hospital', 'Clinic', 'Home']

@app.get("/")
def read_root():
    return {"message": "Neonatal Mortality Prediction API is Running"}

@app.post("/predict")
def predict(data: PatientInput):
    try:
        # --- PREPROCESSING MANUAL ---
        # Model dilatih dengan urutan kolom spesifik dari pd.get_dummies(drop_first=True)
        # Urutan fitur di notebook:
        # 1. Birth_Weight_kg
        # 2. Gestational_Age_weeks
        # 3. Maternal_Age_years
        # 4. Antenatal_Visits
        # 5. Breastfeeding_Initiation_hrs
        # 6. Delivery_Complications_Preeclampsia
        # 7. Delivery_Complications_Sepsis
        # 8. Place_of_Delivery_Home
        # 9. Place_of_Delivery_Hospital

        # 1. Encode Delivery Complications
        # Base category (yang di-drop saat training) kemungkinan adalah 'Asphyxia' atau NaN
        # Kita set default 0
        dc_preeclampsia = 1 if data.Delivery_Complications == "Preeclampsia" else 0
        dc_sepsis = 1 if data.Delivery_Complications == "Sepsis" else 0
        
        # 2. Encode Place of Delivery
        # Base category (yang di-drop) adalah 'Clinic' (karena urutan abjad: Clinic, Home, Hospital)
        pd_home = 1 if data.Place_of_Delivery == "Home" else 0
        pd_hospital = 1 if data.Place_of_Delivery == "Hospital" else 0

        # 3. Susun Array Input
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

        # 4. Prediksi
        prediction = model.predict(input_features)[0]
        
        # Ambil probabilitas (Confidence score)
        # Probabilitas kelas 1 (Died)
        probability_died = model.predict_proba(input_features)[0][1] 
        
        # Mapping hasil (0 = Alive, 1 = Died) sesuai notebook cell 21
        result_label = "Died" if prediction == 1 else "Alive"
        
        return {
            "prediction": result_label,
            "risk_score": float(probability_died), # Nilai 0.0 sampai 1.0
            "input_summary": data.dict()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))