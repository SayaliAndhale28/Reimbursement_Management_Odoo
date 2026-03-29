import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 mb-8">
          You don't have the necessary permissions to view this page. 
          Please contact your administrator if you believe this is an error.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
