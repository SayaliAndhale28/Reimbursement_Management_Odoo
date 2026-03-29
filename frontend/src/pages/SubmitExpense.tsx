import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Upload, X, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Travel', 'Meals', 'Software', 'Hardware', 'Office Supplies', 'Other'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];

export default function SubmitExpense() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: 'Expense submitted successfully!' });
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setReceipt(null);
      setPreview(null);
      
      setTimeout(() => navigate('/history'), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to submit expense. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Submit New Expense</h1>
        <p className="text-slate-500">Fill in the details below to request a reimbursement.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-slate-400" />
                Amount
              </label>
              <div className="flex gap-2">
                <select 
                  className="w-24 px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-slate-400" />
                Category
              </label>
              <select
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                Date
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />
              Description
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Receipt Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                preview ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {preview ? (
                <div className="relative inline-block">
                  <img src={preview} alt="Receipt Preview" className="max-h-48 rounded-lg shadow-md" />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReceipt(null);
                      setPreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Reimbursement'}
          </button>
        </div>
      </form>
    </div>
  );
}
