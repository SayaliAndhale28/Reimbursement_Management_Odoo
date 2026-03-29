import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ExpenseStatus, Expense } from '../types';
import { cn } from '../lib/utils';

const MOCK_HISTORY: Expense[] = [
  { id: '1', employeeId: 'u1', employeeName: 'John Doe', amount: 120.50, currency: 'USD', category: 'Meals', description: 'Client lunch at Bistro', date: '2024-03-25', status: 'APPROVED', createdAt: '2024-03-25' },
  { id: '2', employeeId: 'u1', employeeName: 'John Doe', amount: 45.00, currency: 'USD', category: 'Travel', description: 'Uber to airport', date: '2024-03-24', status: 'PENDING', createdAt: '2024-03-24' },
  { id: '3', employeeId: 'u1', employeeName: 'John Doe', amount: 899.00, currency: 'USD', category: 'Hardware', description: 'New monitor for home office', date: '2024-03-20', status: 'REJECTED', comment: 'Hardware requests must be pre-approved.', createdAt: '2024-03-20' },
];

export default function ExpenseHistory() {
  const [filter, setFilter] = useState<ExpenseStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredExpenses = MOCK_HISTORY.filter(exp => {
    const matchesFilter = filter === 'ALL' || exp.status === filter;
    const matchesSearch = exp.description.toLowerCase().includes(search.toLowerCase()) || 
                         exp.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: ExpenseStatus) => {
    switch (status) {
      case 'APPROVED':
        return <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle2 size={12} /> Approved</span>;
      case 'REJECTED':
        return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full"><XCircle size={12} /> Rejected</span>;
      default:
        return <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><Clock size={12} /> Pending</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expense History</h1>
          <p className="text-slate-500">Track and manage your reimbursement requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none w-64 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-slate-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{exp.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{exp.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 font-medium line-clamp-1">{exp.description}</p>
                    {exp.comment && <p className="text-xs text-red-500 mt-1 italic">Note: {exp.comment}</p>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-900">{exp.currency} {exp.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(exp.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No expenses found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">Showing {filteredExpenses.length} results</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
