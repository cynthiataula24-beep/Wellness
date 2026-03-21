import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Goals.css';

const GoalsPage = () => {
  // Helper to get today's date as a string (e.g., "2023-10-27")
  const getTodayString = () => new Date().toLocaleDateString();

  // PERSISTENCE: Initialize state from LocalStorage
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('wellness_habits');
    const lastDate = localStorage.getItem('last_visit_date');
    const today = getTodayString();

    let habitData = saved ? JSON.parse(saved) : [
      { id: 1, name: 'Water Intake', target: 8, current: 0, unit: 'Glasses', color: '#0d6efd' },
      { id: 2, name: 'Coding', target: 2, current: 0, unit: 'Hours', color: '#6610f2' }
    ];

    // REFRESH LOGIC: If the day has changed, reset progress
    if (lastDate !== today) {
      habitData = habitData.map(h => ({ ...h, current: 0 }));
      localStorage.setItem('last_visit_date', today);
      localStorage.setItem('wellness_habits', JSON.stringify(habitData));
    }

    return habitData;
  });

  const [newHabit, setNewHabit] = useState({ name: '', target: '', unit: '', color: '#0d6efd' });

  // Save to LocalStorage whenever habits change
  useEffect(() => {
    localStorage.setItem('wellness_habits', JSON.stringify(habits));
  }, [habits]);

  // TIMER LOGIC: Check every minute if the day has turned while the user is on the page
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayString();
      const lastDate = localStorage.getItem('last_visit_date');

      if (lastDate !== today) {
        setHabits(prev => prev.map(h => ({ ...h, current: 0 })));
        localStorage.setItem('last_visit_date', today);
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const handleIncrement = (id) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, current: Math.min(h.current + 1, h.target) } : h
    ));
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this habit?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const resetForm = () => {
    setNewHabit({ name: '', target: '', unit: '', color: '#0d6efd' });
    document.getElementById("habit-form").reset();
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    const habitToAdd = {
      ...newHabit,
      id: Date.now(),
      current: 0,
      target: parseFloat(newHabit.target) || 1,
      unit: newHabit.unit || 'Units'
    };

    setHabits([...habits, habitToAdd]);
    const modalElement = document.getElementById('addHabitModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    resetForm();
  };

  return (
    <div className="container py-5 habit-container">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold h2 mb-1 section-title">Daily Goals</h1>
          <p className="text-muted mb-0">Track your habits and stay consistent. (Refreshes Daily)</p>
        </div>
        <button 
          className="btn btn-primary rounded-pill px-4 shadow-sm" 
          data-bs-toggle="modal" 
          data-bs-target="#addHabitModal"
        >
          + Add New Goal
        </button>
      </div>

      <div className="row g-4">
        {habits.map(habit => {
          const isDone = habit.current >= habit.target;
          const progress = (habit.current / habit.target) * 100;

          return (
            <div key={habit.id} className="col-12 col-md-6 col-lg-4">
              <div className={`card h-100 border-0 shadow-sm habit-card ${isDone ? 'goal-completed' : ''}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="progress-circle" style={{ 
                      background: `conic-gradient(${habit.color} ${progress}%, #f1f3f5 0)` 
                    }}>
                      <div className="inner-circle">
                        <span className="fw-bold small">{isDone ? '🎉' : `${Math.round(progress)}%`}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-link text-danger p-0 opacity-50"
                      onClick={() => handleDelete(habit.id)}
                    >✕</button>
                  </div>

                  <h5 className={`fw-bold mb-1 ${isDone ? 'text-decoration-line-through text-muted' : ''}`}>
                    {habit.name}
                  </h5>
                  <p className="text-muted small mb-4">{habit.current} of {habit.target} {habit.unit}</p>

                  <button 
                    className={`btn w-100 rounded-pill py-2 fw-bold ${isDone ? 'btn-success disabled' : 'btn-outline-primary'}`}
                    onClick={() => handleIncrement(habit.id)}
                    disabled={isDone}
                  >
                    {isDone ? 'Completed' : `Log ${habit.unit}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL SECTION */}
      <div className="modal fade" id="addHabitModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Add a New Habit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetForm}></button>
            </div>
            <form id="habit-form" onSubmit={handleAddHabit}>
              <div className="modal-body py-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Habit Name</label>
                  <input type="text" className="form-control rounded-3" placeholder="e.g. Reading" required
                    value={newHabit.name} onChange={(e) => setNewHabit({...newHabit, name: e.target.value})} />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label fw-semibold small">Daily Target</label>
                    <input type="number" className="form-control rounded-3" placeholder="2" required
                      value={newHabit.target} onChange={(e) => setNewHabit({...newHabit, target: e.target.value})} />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label fw-semibold small">Unit</label>
                    <input type="text" className="form-control rounded-3" placeholder="Hours" required
                      value={newHabit.unit} onChange={(e) => setNewHabit({...newHabit, unit: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill shadow-sm">Create Habit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;