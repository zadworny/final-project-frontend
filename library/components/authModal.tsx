// components/AuthModal.tsx
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //  send the data to your backend
    console.log('Form submitted:', { mode, email, password, name });
    // After successful authentication:
    setIsWalletConnected(true);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-900">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        {!isWalletConnected ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">Please connect your wallet to continue</p>
            <ConnectButton />
          </div>
        )}
        <button
          onClick={toggleMode}
          className="mt-4 text-blue-500 hover:underline"
        >
          {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;