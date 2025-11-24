import { Activity } from "lucide-react";

export default function InfoModel() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 shadow-lg">
        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          Parameter Model
        </h4>
        <ul className="space-y-3 text-xs leading-relaxed">
          <li className="flex gap-2">
            <span className="text-teal-400">•</span>
            <span>
              <strong>Base Categories:</strong> Asphyxia (Complications), Clinic
              (Place).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-400">•</span>
            <span>
              <strong>Features:</strong> 9 Input fitur diproses melalui Random
              Forest.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-400">•</span>
            <span>
              <strong>Threshold:</strong> Prediksi Died jika probabilitas &gt;
              0.5 (Default).
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
