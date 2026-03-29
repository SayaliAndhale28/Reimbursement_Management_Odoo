import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, PlusCircle, CheckSquare, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { icon: PlusCircle, label: 'Submit Expense', path: '/submit', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { icon: History, label: 'My History', path: '/history', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    { icon: CheckSquare, label: 'Approvals', path: '/approvals', roles: ['ADMIN', 'MANAGER'] },
    { icon: Settings, label: 'Organization', path: '/admin', roles: ['ADMIN'] },
  ];

  const filteredItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Shield size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tight">ReimbursePro</h1>
      </div>

      <div className="px-8 mb-8">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Role</p>
          <p className="text-sm font-bold text-blue-400">{user?.role}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
              location.pathname === item.path 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              location.pathname === item.path ? "text-white" : "text-slate-500 group-hover:text-white"
            )} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3.5 w-full text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
