import React, { useState } from 'react';

function LoginPage({ login, signup }) {
  const [showSignup, setShowSignup] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    login(loginForm);
  };

  const handleSignup = () => {
    signup(signupForm);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {!showSignup ? (
        <div className="brutal-box p-6">
          <h2 className="text-2xl font-bold mb-6">Login to Library</h2>
          <input 
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
            type="email" 
            placeholder="Email" 
            className="w-full mb-4 p-2 brutal-box" 
          />
          <input 
            name="password"
            value={loginForm.password}
            onChange={handleLoginChange}
            type="password" 
            placeholder="Password" 
            className="w-full mb-4 p-2 brutal-box" 
          />
          <select 
            name="role"
            value={loginForm.role}
            onChange={handleLoginChange}
            className="w-full mb-4 p-2 brutal-box"
          >
            <option value="user">User</option>
            <option value="owner">Library Owner</option>
          </select>
          <button onClick={handleLogin} className="brutal-button w-full p-2 mb-4">Login</button>
          <p className="text-center">
            Don't have an account? 
            <button onClick={() => setShowSignup(true)} className="text-blue-600 underline ml-1">Sign up</button>
          </p>
        </div>
      ) : (
        <div className="brutal-box p-6">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <input 
            name="name"
            value={signupForm.name}
            onChange={handleSignupChange}
            type="text" 
            placeholder="Name" 
            className="w-full mb-4 p-2 brutal-box" 
          />
          <input 
            name="email"
            value={signupForm.email}
            onChange={handleSignupChange}
            type="email" 
            placeholder="Email" 
            className="w-full mb-4 p-2 brutal-box" 
          />
          <input 
            name="password"
            value={signupForm.password}
            onChange={handleSignupChange}
            type="password" 
            placeholder="Password" 
            className="w-full mb-4 p-2 brutal-box" 
          />
          <select 
            name="role"
            value={signupForm.role}
            onChange={handleSignupChange}
            className="w-full mb-4 p-2 brutal-box"
          >
            <option value="user">User</option>
            <option value="owner">Library Owner</option>
          </select>
          <button onClick={handleSignup} className="brutal-button w-full p-2 mb-4">Sign Up</button>
          <p className="text-center">
            Already have an account? 
            <button onClick={() => setShowSignup(false)} className="text-blue-600 underline ml-1">Login</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
