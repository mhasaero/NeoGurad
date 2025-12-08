"use client";

import React, { useState } from "react";
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
  const {
    formData,
    setFormData,
    handlePredict,
    loading,
    error: apiError,
  } = usePrediction();

  // State untuk menyimpan pesan error validasi lokal
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fungsi validasi
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validasi Berat Lahir (0.1 kg - 10 kg)
    const weight = parseFloat(formData.Birth_Weight_kg);
    if (!formData.Birth_Weight_kg) newErrors.Birth_Weight_kg = "Wajib diisi";
    else if (weight < 0.1 || weight > 10)
      newErrors.Birth_Weight_kg = "Berat tidak valid (0.1 - 10 kg)";

    // Validasi Usia Gestasi (20 - 45 minggu)
    const gestasi = parseFloat(formData.Gestational_Age_weeks);
    if (!formData.Gestational_Age_weeks)
      newErrors.Gestational_Age_weeks = "Wajib diisi";
    else if (gestasi < 20 || gestasi > 45)
      newErrors.Gestational_Age_weeks = "Minggu tidak valid (20 - 45)";

    // Validasi Inisiasi Menyusui (0 - 48 jam)
    const breastfeeding = parseFloat(formData.Breastfeeding_Initiation_hrs);
    if (!formData.Breastfeeding_Initiation_hrs)
      newErrors.Breastfeeding_Initiation_hrs = "Wajib diisi";
    else if (breastfeeding < 0 || breastfeeding > 48)
      newErrors.Breastfeeding_Initiation_hrs =
        "Durasi tidak wajar (0 - 48 jam)";

    // Validasi Usia Ibu (12 - 60 tahun)
    const age = parseFloat(formData.Maternal_Age_years);
    if (!formData.Maternal_Age_years)
      newErrors.Maternal_Age_years = "Wajib diisi";
    else if (age < 12 || age > 60)
      newErrors.Maternal_Age_years = "Usia tidak valid (12 - 60 thn)";

    // Validasi Kunjungan Antenatal (0 - 30 kali)
    const visits = parseFloat(formData.Antenatal_Visits);
    if (!formData.Antenatal_Visits) newErrors.Antenatal_Visits = "Wajib diisi";
    else if (visits < 0 || visits > 30)
      newErrors.Antenatal_Visits = "Jumlah tidak wajar (0 - 30 kali)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true jika tidak ada error
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus error realtime saat user mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handlePredict(e);
    }
  };

  const getInputClass = (fieldName: string) =>
    `w-full px-3 py-2 rounded-lg border outline-none transition ${
      errors[fieldName]
        ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
        : "border-slate-300 focus:ring-2 focus:ring-teal-500"
    }`;

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          <Stethoscope className="text-teal-600 w-5 h-5" />
          <h3 className="text-lg font-semibold">Input Data Klinis Pasien</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section Data Neonatal */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Baby className="w-4 h-4" /> Data Neonatal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Berat Lahir */}
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
                  className={getInputClass("Birth_Weight_kg")}
                />
                {errors.Birth_Weight_kg && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {errors.Birth_Weight_kg}
                  </p>
                )}
              </div>

              {/* Usia Gestasi */}
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
                  className={getInputClass("Gestational_Age_weeks")}
                />
                {errors.Gestational_Age_weeks && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {errors.Gestational_Age_weeks}
                  </p>
                )}
              </div>

              {/* Inisiasi Menyusui */}
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
                    className={getInputClass("Breastfeeding_Initiation_hrs")}
                  />
                </div>
                {errors.Breastfeeding_Initiation_hrs ? (
                  <p className="text-[10px] text-red-500 font-medium">
                    {errors.Breastfeeding_Initiation_hrs}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 mt-1">
                    *Masukkan bilangan bulat (int)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section Data Ibu */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Data Ibu & Lingkungan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Usia Ibu */}
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
                  className={getInputClass("Maternal_Age_years")}
                />
                {errors.Maternal_Age_years && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {errors.Maternal_Age_years}
                  </p>
                )}
              </div>

              {/* Kunjungan Antenatal */}
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
                  className={getInputClass("Antenatal_Visits")}
                />
                {errors.Antenatal_Visits && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {errors.Antenatal_Visits}
                  </p>
                )}
              </div>

              {/* Tempat Persalinan */}
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

              {/* Komplikasi */}
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

          {/* Error dari API/Backend */}
          {apiError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4" />
              {apiError}
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
