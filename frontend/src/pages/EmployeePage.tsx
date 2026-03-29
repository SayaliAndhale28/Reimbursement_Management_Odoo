import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default function EmployeePage() {
  const team = [
    { name: 'Sarah Wilson', role: 'Lead Designer', email: 'sarah@company.com' },
    { name: 'Michael Chen', role: 'Fullstack Dev', email: 'michael@company.com' },
    { name: 'Emma Davis', role: 'Product Manager', email: 'emma@company.com' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
          <Users size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Directory</h1>
          <p className="text-slate-500">Connect with your colleagues across the organization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.email} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl mb-4">
              {member.name[0]}
            </div>
            <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
            <p className="text-emerald-600 text-sm font-medium mb-4">{member.role}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Phone size={14} />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
