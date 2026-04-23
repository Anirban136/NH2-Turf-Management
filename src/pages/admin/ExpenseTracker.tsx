import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Maintenance', amount: 2500, date: '2026-04-20', notes: 'Turf cleaning and leveling' },
    { id: 2, category: 'Electricity', amount: 8000, date: '2026-04-18', notes: 'Monthly bill' },
    { id: 3, category: 'Equipment', amount: 4500, date: '2026-04-15', notes: 'New cricket balls and nets' },
  ]);

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Expense Tracker</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Expense Form */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Add Expense</h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
              <select>
                <option>Maintenance</option>
                <option>Electricity</option>
                <option>Equipment</option>
                <option>Staff Salary</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Amount (₹)</label>
              <input type="number" placeholder="Enter amount" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Date</label>
              <input type="date" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Notes</label>
              <textarea placeholder="Optional notes" rows={3}></textarea>
            </div>
            <button className="btn btn-primary mt-2" style={{ width: '100%' }}>
              <Plus size={18} /> Add Expense
            </button>
          </form>
        </div>

        {/* Expense Table */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontSize: '1.25rem' }}>Recent Expenses</h2>
            <div style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(231, 76, 60, 0.1)', color: 'var(--status-error)', borderRadius: 'var(--border-radius)', fontWeight: 600 }}>
              Total: ₹{totalExpense}
            </div>
          </div>
          
          <table style={{ marginTop: '1rem' }}>
            <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Notes</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td><span className="badge badge-info">{exp.category}</span></td>
                  <td className="text-secondary">{exp.notes}</td>
                  <td className="text-right" style={{ fontWeight: 600 }}>₹{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
