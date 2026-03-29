import { useState, FormEvent } from 'react';
import { Users, Plus, GitBranch, ArrowRight, Trash2, Settings, UserPlus, Shield } from 'lucide-react';
import { User, UserRole, WorkflowStep } from '../types';
import { cn } from '../lib/utils';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'workflow'>('users');
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Aniket Admin', email: 'aniket@company.com', role: 'ADMIN', companyId: 'c1' },
    { id: '2', name: 'Sarah Manager', email: 'sarah@company.com', role: 'MANAGER', companyId: 'c1' },
    { id: '3', name: 'John Employee', email: 'john@company.com', role: 'EMPLOYEE', companyId: 'c1', managerId: '2' },
  ]);

  const [workflow, setWorkflow] = useState<WorkflowStep[]>([
    { id: 'w1', role: 'MANAGER', minAmount: 0 },
    { id: 'w2', role: 'ADMIN', minAmount: 1000 },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'EMPLOYEE' as UserRole, managerId: '' });

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser,
      companyId: 'c1',
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'EMPLOYEE', managerId: '' });
  };

  const addWorkflowStep = () => {
    const step: WorkflowStep = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'MANAGER',
      minAmount: 0,
    };
    setWorkflow([...workflow, step]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Panel</h1>
          <p className="text-slate-500">Configure your organization's users and approval workflows.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'users' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'workflow' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            Approval Workflow
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Manager</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{u.name}</p>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                          u.role === 'ADMIN' ? "bg-red-50 text-red-600" :
                          u.role === 'MANAGER' ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-600"
                        )}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {users.find(m => m.id === u.managerId)?.name || '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <UserPlus size={20} className="text-blue-500" />
                Add New User
              </h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                  <input
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Role</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Assign Manager</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                    value={newUser.managerId}
                    onChange={(e) => setNewUser({ ...newUser, managerId: e.target.value })}
                  >
                    <option value="">No Manager</option>
                    {users.filter(u => u.role !== 'EMPLOYEE').map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors mt-4"
                >
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GitBranch size={20} className="text-blue-500" />
                Reimbursement Approval Sequence
              </h3>
              <button
                onClick={addWorkflowStep}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
              >
                <Plus size={18} /> Add Step
              </button>
            </div>

            <div className="space-y-6 relative">
              {workflow.map((step, index) => (
                <div key={step.id} className="relative">
                  {index !== 0 && (
                    <div className="absolute -top-6 left-10 w-0.5 h-6 bg-slate-100" />
                  )}
                  <div className="flex items-center gap-6 group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-400 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                      <span className="text-xs font-bold uppercase tracking-widest mb-1">Step</span>
                      <span className="text-2xl font-black text-slate-900">{index + 1}</span>
                    </div>
                    
                    <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-8">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Approver Role</label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={step.role}
                            onChange={(e) => {
                              const newWorkflow = [...workflow];
                              newWorkflow[index].role = e.target.value as UserRole;
                              setWorkflow(newWorkflow);
                            }}
                          >
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Administrator</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Min. Amount ($)</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={step.minAmount}
                            onChange={(e) => {
                              const newWorkflow = [...workflow];
                              newWorkflow[index].minAmount = Number(e.target.value);
                              setWorkflow(newWorkflow);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setWorkflow(workflow.filter(s => s.id !== step.id))}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-800 p-3 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Workflow Security</h3>
                <p className="text-blue-200 text-sm">All changes are logged and require admin verification.</p>
              </div>
            </div>
            <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Save Workflow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
