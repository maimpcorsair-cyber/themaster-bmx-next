'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - เปลี่ยนได้
    if (password === 'masterbmx2568') {
      localStorage.setItem('admin_logged_in', 'true');
      router.push('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin Login</h1>
          <p className="text-gray-500">The Master BMX Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600`}
              placeholder="Enter password"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">รหัสผ่านไม่ถูกต้อง</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-500 text-sm hover:text-white">
            ← กลับหน้าแรก
          </a>
        </div>
      </div>
    </div>
  );
}
