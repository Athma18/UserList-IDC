import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const usersDatabase = [];

const Auth = ({ register }) => {
  const [isLogin, setIsLogin] = useState(!register); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(!register);
  }, [register]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !username)) {
      setError('All fields are required');
      return;
    }

    setError('');

    if (isLogin) {
      const user = usersDatabase.find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard'); 
      } else {
        setError('Invalid email or password');
      }
    } else {
      const existingUser = usersDatabase.find((user) => user.email === email);
      if (existingUser) {
        setError('Email already registered');
      } else {
        const newUser = { username, email, password };
        usersDatabase.push(newUser); 
        localStorage.setItem('user', JSON.stringify(newUser));        navigate('/login');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="row justify-content-center align-items-center w-100 h-100">
        
        <div className="col-md-6 auth-image">
          <img src="https://png.pngtree.com/png-clipart/20230504/original/pngtree-free-vector-login-concept-illustration-png-image_9140539.png" alt="Login" className="img-fluid" />
        </div>

        <div className="col-md-6">
          <div className="auth-box">
            <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="submit-button">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </div>
            </form>

            <div className="toggle-form">
              <button onClick={() => navigate(isLogin ? '/register' : '/login')} className="toggle-button">
                {isLogin
                  ? "Don't have an account? Register here"
                  : 'Already have an account? Login here'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
