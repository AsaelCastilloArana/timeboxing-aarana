import React, { useState, useEffect } from 'react';
import { CheckCircle2, Brain, Calendar, LogOut, Save } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  // 1. Estado para las Prioridades
  const [priorities, setPriorities] = useState(() => {
    const saved = localStorage.getItem(`${user}_priorities`);
    return saved ? JSON.parse(saved) : ["", "", ""];
  });

  // 2. Estado para el Brain Dump
  const [brainDump, setBrainDump] = useState(() => {
    return localStorage.getItem(`${user}_braindump`) || "";
  });

  // 3. Estado para el Horario (Objeto: { "8:00-00": "Texto", "8:00-30": "Texto" })
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem(`${user}_schedule`);
    return saved ? JSON.parse(saved) : {};
  });

  // Guardado automático en LocalStorage cada vez que algo cambia
  useEffect(() => {
    localStorage.setItem(`${user}_priorities`, JSON.stringify(priorities));
    localStorage.setItem(`${user}_braindump`, brainDump);
    localStorage.setItem(`${user}_schedule`, JSON.stringify(schedule));
  }, [priorities, brainDump, schedule, user]);

  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM a 9 PM

  const handleScheduleChange = (hour, slot, value) => {
    setSchedule(prev => ({
      ...prev,
      [`${hour}-${slot}`]: value
    }));
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-info">
          <Calendar size={20} />
          <span>{new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
        <div className="user-actions">
          <span className="save-status"><Save size={14} /> Auto-guardado</span>
          <button onClick={onLogout} className="icon-btn"><LogOut size={18} /></button>
        </div>
      </nav>

      <div className="main-content">
        {/* PANEL IZQUIERDO */}
        <aside className="left-panel">
          <div className="glass-card">
            <h3><CheckCircle2 size={18} /> Top Priorities</h3>
            {priorities.map((p, i) => (
              <input 
                key={i}
                className="task-input"
                value={p}
                onChange={(e) => {
                  const next = [...priorities];
                  next[i] = e.target.value;
                  setPriorities(next);
                }}
                placeholder={`Prioridad ${i + 1}`}
              />
            ))}
          </div>

          <div className="glass-card full-height">
            <h3><Brain size={18} /> Brain Dump</h3>
            <textarea 
              className="brain-input"
              value={brainDump}
              onChange={(e) => setBrainDump(e.target.value)}
              placeholder="Escribe todo lo que tengas en mente..."
            />
          </div>
        </aside>

        {/* PLANIFICADOR (HORARIO) */}
        <section className="schedule-section">
          <div className="schedule-header">
            <span>Hora</span>
            <span>Plan :00</span>
            <span>Plan :30</span>
          </div>
          <div className="schedule-body scroll-custom">
            {hours.map(h => (
              <div key={h} className="hour-row">
                <div className="time-label">{h}:00</div>
                <input 
                  className="time-slot-input"
                  value={schedule[`${h}-00`] || ""}
                  onChange={(e) => handleScheduleChange(h, "00", e.target.value)}
                />
                <input 
                  className="time-slot-input"
                  value={schedule[`${h}-30`] || ""}
                  onChange={(e) => handleScheduleChange(h, "30", e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;