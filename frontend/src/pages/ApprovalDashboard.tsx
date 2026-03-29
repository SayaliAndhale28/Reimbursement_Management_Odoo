import { useState } from 'react';
import { Check, X, MessageSquare, User, DollarSign, ArrowRight } from 'lucide-react';
import { Expense, ExpenseStatus } from '../types';
import { cn } from '../lib/utils';

const MOCK_PENDING: Expense[] = [
  { id: '4', employeeId: 'u2', employeeName: 'Alice Smith', amount: 2500.00, currency: 'USD', category: 'Software', description: 'Annual SaaS subscription for design tools', date: '2024-03-28', status: 'PENDING', createdAt: '2024-03-28' },
  { id: '5', employeeId: 'u3', employeeName: 'Bob Wilson', amount: 45.20, currency: 'EUR', category: 'Meals', description: 'Lunch with potential hire', date: '2024-03-27', status: 'PENDING', createdAt: '2024-03-27' },
  { id: '6', employeeId: 'u4', employeeName: 'Emma Brown', amount: 1200.00, currency: 'GBP', category: 'Travel', description: 'Flight to London for conference', date: '2024-03-26', status: 'PENDING', createdAt: '2024-03-26' },
];

export default function ApprovalDashboard() {
  const [expenses, setExpenses] = useState(MOCK_PENDING);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const handleAction = (id: string, status: ExpenseStatus) => {
    if (status === 'REJECTED' && !rejectingId) {
      setRejectingId(id);
      return;
    }
    
    // Mock API call
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    setRejectingId(null);
    setComment('');
  };

  // Mock conversion to company currency (USD)
  const convertToUSD = (amount: number, currency: string) => {
    const rates: Record<string, number> = { USD: 1, EUR: 1.08, GBP: 1.26, INR: 0.012, JPY: 0.0066 };
    return amount * (rates[currency] || 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Approval Dashboard</h1>
        <p className="text-slate-500">Review and process pending reimbursement requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {expenses.map((exp) => (
          <div key={exp.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {exp.employeeName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{exp.employeeName}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <User size={14} /> Employee ID: {exp.employeeId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted On</p>
                  <p className="text-sm font-medium text-slate-900">{exp.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Original Amount</p>
                  <p className="text-xl font-bold text-slate-900">{exp.currency} {exp.amount.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-slate-300" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Company Currency (USD)</p>
                    <p className="text-xl font-bold text-blue-600">${convertToUSD(exp.amount, exp.currency).toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</p>
                  <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-bold">
                    {exp.category}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</p>
                <p className="text-slate-700 font-medium leading-relaxed">{exp.description}</p>
              </div>

              {rejectingId === exp.id && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  <label className="block text-sm font-bold text-red-600 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} />
                    Rejection Reason
                  </label>
                  <textarea
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border-2 border-red-100 focus:border-red-500 outline-none resize-none bg-red-50/30"
                    placeholder="Provide a reason for rejection..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-8 flex flex-row md:flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 min-w-[200px]">
              {rejectingId === exp.id ? (
                <>
                  <button
                    onClick={() => handleAction(exp.id, 'REJECTED')}
                    disabled={!comment.trim()}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
                  >
                    Confirm Rejection
                  </button>
                  <button
                    onClick={() => { setRejectingId(null); setComment(''); }}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(exp.id, 'APPROVED')}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <Check size={20} /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(exp.id, 'REJECTED')}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-white text-red-600 border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={20} /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {expenses.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">All Caught Up!</h3>
            <p className="text-slate-500 mt-2">There are no pending reimbursement requests to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
