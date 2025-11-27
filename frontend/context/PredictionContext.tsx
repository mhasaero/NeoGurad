"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PredictionResult } from "@/types/modelType";

interface FormData {
  Birth_Weight_kg: string;
  Gestational_Age_weeks: string;
  Maternal_Age_years: string;
  Antenatal_Visits: string;
  Breastfeeding_Initiation_hrs: string;
  Delivery_Complications: string;
  Place_of_Delivery: string;
}

interface PredictionContextType {
  formData: FormData;
  loading: boolean;
  error: string | null;
  result: PredictionResult | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handlePredict: (e: React.FormEvent) => Promise<void>;
  resetResult: () => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(
  undefined
);

export const PredictionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState<FormData>({
    Birth_Weight_kg: "",
    Gestational_Age_weeks: "",
    Maternal_Age_years: "",
    Antenatal_Visits: "",
    Breastfeeding_Initiation_hrs: "",
    Delivery_Complications: "None",
    Place_of_Delivery: "Hospital",
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        Birth_Weight_kg: parseFloat(formData.Birth_Weight_kg),
        Gestational_Age_weeks: parseInt(formData.Gestational_Age_weeks),
        Maternal_Age_years: parseInt(formData.Maternal_Age_years),
        Antenatal_Visits: parseInt(formData.Antenatal_Visits),
        Breastfeeding_Initiation_hrs: parseInt(
          formData.Breastfeeding_Initiation_hrs
        ),
        Delivery_Complications: formData.Delivery_Complications,
        Place_of_Delivery: formData.Place_of_Delivery,
      };

      const response = await fetch(
        "https://neogurad-production.up.railway.app/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Gagal terhubung ke server. Pastikan backend Python berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const resetResult = () => {
    setResult(null);
    setError(null);
  };

  return (
    <PredictionContext.Provider
      value={{
        formData,
        loading,
        error,
        result,
        setFormData,
        handlePredict,
        resetResult,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error("usePrediction must be used within a PredictionProvider");
  }
  return context;
};
