import { Activity } from "lucide-react";
import { usePrediction } from "@/context/PredictionContext";

export default function Navbar() {
  const { result } = usePrediction();
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-teal-600 p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              NeoGuard AI
            </h1>
            <p className="text-xs text-slate-500">
              Sistem Prediksi Risiko Neonatal
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              result ? "bg-green-500" : "bg-slate-300"
            }`}
          ></span>
          <span className="text-xs text-slate-500">
            API Status: {result ? "Connected" : "Ready"}
          </span>
        </div>
      </div>
    </nav>
  );
}
