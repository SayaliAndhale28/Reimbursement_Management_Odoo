import { useAuth } from '../context/AuthContext';
import { BarChart3, Users, Clock, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Projects', value: '12', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Tasks', value: '48', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Completed', value: '156', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Team Members', value: '24', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">General Dashboard</h1>
        <p className="text-slate-500">Overview of your current status and activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Update on Project Phoenix</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 text-blue-600 uppercase">Update</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
