import { Briefcase, TrendingUp, PieChart, FileText } from 'lucide-react';

export default function ManagerPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
          <Briefcase size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Management Dashboard</h1>
          <p className="text-slate-500">Track team performance and project milestones.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            Team Velocity
          </h3>
          <div className="h-48 bg-slate-50 rounded-xl flex items-end justify-around p-4 gap-2">
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500 rounded-t-lg" />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-purple-500" />
            Resource Allocation
          </h3>
          <div className="space-y-4">
            {['Engineering', 'Design', 'Marketing'].map((dept) => (
              <div key={dept}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{dept}</span>
                  <span className="font-bold">75%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[75%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
