import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useAuth } from '../contexts/AuthContext';
import useRegister from '../hooks/useRegister';

const SignUp = () => {
  const { t } = useTranslation();
  
  // const { signup, isLoading, error } = useAuth();
  const { register, isloading } = useRegister();

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      
      const response = await register(email, password);
      if(response != undefined ){
        alert("Signed up successfully!");
        navigate('/login');
      }
      else{
        setFormError('Email already Exits Internal Error Occured Try Again Later');
      }

    } catch (err) {
      setFormError(err.message || 'Failed to create an account');
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-32">
      <div className="bg-secondary rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {t('SignUp')}
        </h1>
        
        {(formError ||error) && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            {formError || error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-medium mb-2">
              {t('Email')}
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-primary text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isloading}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-medium mb-2">
              {t('Password')}
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-primary text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isloading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary py-3"
            disabled={isloading}
          >
            {isloading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                Loading...
              </span>
            ) : (
              t('SignUp')
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            {t('AlreadyHaveAccount')} <Link to="/login" className="text-accent hover:underline">{t('Login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
