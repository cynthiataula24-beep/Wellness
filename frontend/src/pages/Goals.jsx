import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Goals.css';

const GoalsPage = () => {
  // 1. Updated Defaults: "Deep Work" instead of Coding
  const defaultHabits = [
    { id: 'def-1', name: 'Water Intake', target: 8, current: 0, unit: 'Glasses', color: '#0d6efd', isDefault: true },
    { id: 'def-2', name: 'Daily Steps', target: 10000, current: 0, unit: 'Steps', color: '#198754', isDefault: true },
    
  ];

  const [habits, setHabits] = useState(defaultHabits);
  const [newHabit, setNewHabit] = useState({ name: '', target: '', unit: '', color: '#0d6efd' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('access_token');

  const fetchHabits = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/habits", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const dbHabits = await response.json();
        // Merge the local visual defaults with actual data from DB
        const merged = defaultHabits.map(def => {
          const cloudData = dbHabits.find(db => db.name === def.name);
          return cloudData ? { ...def, ...cloudData, id: cloudData.id, isDefault: true } : def;
        });
        
        // Add any user-created habits that aren't in the default list
        const extraHabits = dbHabits.filter(db => !defaultHabits.some(def => def.name === db.name));
        setHabits([...merged, ...extraHabits]);
      }
    } catch (err) {
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleIncrement = async (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit || habit.current >= habit.target) return;

    // 2. Step Logic: Increment by 100 if it's Daily Steps, otherwise 1
    const amount = habit.name === 'Daily Steps' ? 100 : 1;
    const newCurrent = Math.min(habit.current + amount, habit.target);

    // Sync to DB (All habits including defaults now have DB IDs via the fetch merge)
    if (typeof id === 'number') {
      try {
        const response = await fetch(`http://127.0.0.1:5000/habits/${id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ current: newCurrent })
        });
        if (!response.ok) return;
      } catch (err) { console.error(err); return; }
    }

    setHabits(habits.map(h => h.id === id ? { ...h, current: newCurrent } : h));
  };

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const habitData = {
      name: newHabit.name,
      target: parseFloat(newHabit.target) || 1,
      unit: newHabit.unit || 'Units',
      color: newHabit.color,
      current: 0
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/habits", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(habitData)
      });

      if (response.ok) {
        const savedHabit = await response.json();
        setHabits([...habits, savedHabit]);
        const modalElement = document.getElementById('addHabitModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
        resetForm();
      }
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  const handleDelete = async (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit?.isDefault) return;

    if(!window.confirm("Are you sure you want to delete this goal?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/habits/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setHabits(habits.filter(h => h.id !== id));
      }
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  const resetForm = () => {
    setNewHabit({ name: '', target: '', unit: '', color: '#0d6efd' });
  };

  if (loading) return <div className="container py-5 text-center">Loading your wellness journey...</div>;

  return (
    <div className="container py-5 habit-container">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold h2 mb-1 section-title">Daily Goals</h1>
          <p className="text-muted mb-0">Stay consistent. Resetting daily.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#addHabitModal">
          + Add New Goal
        </button>
      </div>

      <div className="row g-4">
        {habits.map(habit => {
          const isDone = habit.current >= habit.target;
          const progress = Math.min((habit.current / habit.target) * 100, 100);

          return (
            <div key={habit.id} className="col-12 col-md-6 col-lg-4">
              <div className={`card h-100 border-0 shadow-sm habit-card ${isDone ? 'goal-completed' : ''}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="progress-circle" style={{ background: `conic-gradient(${habit.color || '#0d6efd'} ${progress}%, #f1f3f5 0)` }}>
                      <div className="inner-circle">
                        <span className="fw-bold small">{isDone ? '🎉' : `${Math.round(progress)}%`}</span>
                      </div>
                    </div>
                    {!habit.isDefault && (
                      <button className="btn btn-link text-danger p-0 opacity-50 text-decoration-none" onClick={() => handleDelete(habit.id)}>✕</button>
                    )}
                  </div>

                  <h5 className={`fw-bold mb-1 ${isDone ? 'text-decoration-line-through text-muted' : ''}`}>{habit.name}</h5>
                  <p className="text-muted small mb-4">{habit.current} of {habit.target} {habit.unit}</p>

                  <button 
                    className={`btn w-100 rounded-pill py-2 fw-bold ${isDone ? 'btn-success disabled' : 'btn-outline-primary'}`}
                    onClick={() => handleIncrement(habit.id)}
                    disabled={isDone}
                  >
                    {isDone ? 'Completed' : `Log ${habit.name === 'Daily Steps' ? '100 ' : ''}${habit.unit}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL remains the same */}
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