import React from 'react';
import { Calendar, CheckCircle2, Brain, Clock } from 'lucide-react';

const Dashboard = ({ userEmail }) => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM a 9 PM

  return (
    <div className="dashboard-layout">
      {/* Sidebar / Info */}
      <aside className="sidebar">
        <div className="user-info">
          <span>Conectado como:</span>
          <strong>{userEmail}</strong>
        </div>
        
        <div className="section-card">
          <h3 className="section-title"><CheckCircle2 size={18}/> Top Priorities</h3>
          {[1, 2, 3].map(i => (
            <div key={i} className="priority-row">
              <input type="checkbox" />
              <input type="text" placeholder={`Prioridad ${i}...`} />
            </div>
          ))}
        </div>

        <div className="section-card">
          <h3 className="section-title"><Brain size={18}/> Brain Dump</h3>
          <textarea placeholder="Escribe tus ideas aquí..." className="modern-textarea"></textarea>
        </div>
      </aside>

      {/* Grid de Tiempo Principal */}
      <main className="time-grid-container">
        <header className="grid-header">
          <div className="date-display">
            <Calendar size={20} />
            <span>{new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
          <div className="time-labels">
            <span>:00</span>
            <span>:30</span>
          </div>
        </header>

        <div className="scrollable-grid">
          {hours.map(hour => (
            <div key={hour} className="time-row">
              <div className="hour-tag">{hour}:00</div>
              <div className="time-slot" contentEditable></div>
              <div className="time-slot" contentEditable></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;