"use client";

import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  Baby,
  Clock,
  HeartPulse,
  MapPin,
  Stethoscope,
  User,
} from "lucide-react";
import { usePrediction } from "@/context/PredictionContext";

export default function FormPredict() {
  const { formData, setFormData, handlePredict, loading, error } =
    usePrediction();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <Stethoscope className="text-teal-600 w-5 h-5" />
          <h3 className="text-lg font-semibold">Input Data Klinis Pasien</h3>
        </div>

        <form onSubmit={handlePredict} className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Baby className="w-4 h-4" /> Data Neonatal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Berat Lahir (kg)
                </label>
                <input
                  name="Birth_Weight_kg"
                  type="number"
                  step="0.01"
                  placeholder="2.5"
                  value={formData.Birth_Weight_kg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Usia Gestasi (minggu)
                </label>
                <input
                  name="Gestational_Age_weeks"
                  type="number"
                  step="1"
                  placeholder="38"
                  value={formData.Gestational_Age_weeks}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Inisiasi Menyusui (jam)
                </label>
                <div className="relative">
                  <Clock className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
                  <input
                    name="Breastfeeding_Initiation_hrs"
                    type="number"
                    step="1"
                    placeholder="1"
                    value={formData.Breastfeeding_Initiation_hrs}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  *Masukkan bilangan bulat (int)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Data Ibu & Lingkungan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Usia Ibu (tahun)
                </label>
                <input
                  name="Maternal_Age_years"
                  type="number"
                  placeholder="28"
                  value={formData.Maternal_Age_years}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Kunjungan Antenatal (kali)
                </label>
                <input
                  name="Antenatal_Visits"
                  type="number"
                  placeholder="4"
                  value={formData.Antenatal_Visits}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Tempat Persalinan
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
                  <select
                    name="Place_of_Delivery"
                    value={formData.Place_of_Delivery}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white appearance-none transition"
                  >
                    <option value="Hospital">Hospital (Rumah Sakit)</option>
                    <option value="Clinic">Clinic (Klinik)</option>
                    <option value="Home">Home (Rumah)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Komplikasi Persalinan
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
                  <select
                    name="Delivery_Complications"
                    value={formData.Delivery_Complications}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white appearance-none transition"
                  >
                    <option value="None">None (Tidak Ada)</option>
                    <option value="Sepsis">Sepsis</option>
                    <option value="Asphyxia">Asphyxia</option>
                    <option value="Preeclampsia">Preeclampsia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Menganalisis Data...
                </>
              ) : (
                <>
                  <HeartPulse className="w-5 h-5" />
                  Prediksi Outcome
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
