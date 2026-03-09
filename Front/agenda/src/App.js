import React, { useState } from 'react';
import './App.css';
import { Lock, User, CheckCircle2, Brain, Calendar, LogOut } from 'lucide-react';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="login-screen">
      <div className="login-box">
        <h2>Timeboxing <span className="dot">.</span></h2>
        <p>Ingresa para gestionar tu día</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email); }}>
          <div className="input-field">
            <User size={18} />
            <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-field">
            <Lock size={18} />
            <input type="password" placeholder="Contraseña" required />
          </div>
          <button type="submit" className="primary-btn">Comenzar</button>
        </form>
      </div>
    </div>
  );
};


const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState(["", "", ""]);
  const [notes, setNotes] = useState("");
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM a 9 PM

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-info">
          <Calendar size={20} />
          <span>{new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric' })}</span>
        </div>
        <div className="user-section">
          <span>{user}</span>
          <button onClick={onLogout} className="icon-btn"><LogOut size={18} /></button>
        </div>
      </nav>

      <div className="main-content">
        <aside className="left-panel">
          <div className="glass-card">
            <h3><CheckCircle2 size={18} /> Top Priorities</h3>
            {tasks.map((task, i) => (
              <input 
                key={i} 
                className="task-input" 
                value={task} 
                onChange={(e) => {
                  const newTasks = [...tasks];
                  newTasks[i] = e.target.value;
                  setTasks(newTasks);
                }}
                placeholder={`Prioridad ${i+1}`}
              />
            ))}
          </div>

          <div className="glass-card full-height">
            <h3><Brain size={18} /> Brain Dump</h3>
            <textarea 
              className="brain-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ideas, recordatorios, notas rápidas..."
            />
          </div>
        </aside>

        <section className="schedule-section">
          <div className="schedule-header">
            <span>Hora</span>
            <span>Plan :00</span>
            <span>Plan :30</span>
          </div>
          <div className="schedule-body">
            {hours.map(h => (
              <div key={h} className="hour-row">
                <div className="time-label">{h}:00</div>
                <div className="time-slot" contentEditable="true"></div>
                <div className="time-slot" contentEditable="true"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;
  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}

