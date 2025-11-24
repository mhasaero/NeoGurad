import { usePrediction } from "@/context/PredictionContext";
import { Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function ResultCard() {
  const { result, loading } = usePrediction();

  return (
    <>
      {!result && !loading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500  flex flex-col justify-center items-center min-h-[300px]">
          <Activity className="w-16 h-16 text-slate-200 mb-4" />
          <h3 className="font-semibold text-slate-700">Menunggu Input Data</h3>
          <p className="text-sm max-w-xs mx-auto mt-2">
            Silakan lengkapi formulir klinis di samping dan tekan tombol
            prediksi untuk melihat hasil analisis AI.
          </p>
        </div>
      )}

      {result && (
        <div
          className={`rounded-2xl p-6 shadow-lg border animate-in fade-in zoom-in duration-300 ${
            result.prediction === "Died"
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-green-50 border-green-200 text-green-900"
          }`}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className={`p-4 rounded-full shadow-sm ${
                result.prediction === "Died"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {result.prediction === "Died" ? (
                <AlertCircle className="w-12 h-12" />
              ) : (
                <CheckCircle className="w-12 h-12" />
              )}
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold opacity-70 mb-1">
                HASIL PREDIKSI (AI)
              </h4>
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
                {result.prediction === "Died"
                  ? "BERISIKO TINGGI"
                  : "RISIKO RENDAH"}
              </h2>
              <p className="text-sm font-medium opacity-90 max-w-xs mx-auto">
                {result.prediction === "Died"
                  ? "Model mendeteksi pola yang mengarah pada kematian neonatal (Died)."
                  : "Model memprediksi bayi akan bertahan hidup (Alive)."}
              </p>
            </div>

            <div className="w-full bg-white/50 rounded-lg p-4 mt-2 border border-black/5">
              <div className="flex justify-between text-xs font-semibold mb-2 uppercase">
                <span>Tingkat Risiko (Probability)</span>
                <span>{(result.risk_score * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    result.prediction === "Died" ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${result.risk_score * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
