import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Printer, Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@demo.com' && password === 'admin123') {
      onLogin(email, password);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-4">
            <Printer className="w-12 h-12 text-[#dc322f]" />
          </Link>
          <h2 className="text-3xl font-bold text-[#073642]">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-[#657b83] mt-2">
            {isLogin ? 'Sign in to your account' : 'Start your printing journey'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eee8d5]">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                isLogin
                  ? 'bg-[#dc322f] text-white'
                  : 'bg-[#eee8d5] text-[#657b83] hover:bg-[#dc322f] hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                !isLogin
                  ? 'bg-[#dc322f] text-white'
                  : 'bg-[#eee8d5] text-[#657b83] hover:bg-[#dc322f] hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#93a1a1]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#073642] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#93a1a1]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-[#eee8d5] text-[#dc322f] focus:ring-[#dc322f]"
                  />
                  <span className="ml-2 text-sm text-[#657b83]">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#dc322f] hover:text-[#cb4b16]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#dc322f] text-white py-3 rounded-xl font-semibold hover:bg-[#cb4b16] transition-colors"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Demo credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-[#eee8d5] rounded-xl">
              <p className="text-sm text-[#657b83]">
                <strong>Demo Credentials:</strong><br />
                Email: admin@demo.com<br />
                Password: admin123
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;