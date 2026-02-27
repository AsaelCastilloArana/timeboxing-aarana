import React, { useState } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) onLogin(email); // Simulación de login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">TB</div>
          <h2>Bienvenido a Timeboxing</h2>
          <p>Organiza tu día de forma productiva</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} />
            <input 
              type="email" 
              placeholder="Tu correo universitario" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <Lock size={18} />
            <input type="password" placeholder="Contraseña" required />
          </div>
          <button type="submit" className="btn-login">
            Entrar <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;