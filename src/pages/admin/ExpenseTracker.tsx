import React, { useState, useEffect } from 'react';
import { Plus, Wallet, Calendar, TrendingUp, Search, Filter, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: 'Maintenance', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Error fetching expenses:', error);
    else setExpenses(data || []);
    setLoading(false);
  };

  const handleOpenForm = (expense?: any) => {
    if (expense) {
      setEditingId(expense.id);
      setFormData({
        category: expense.category,
        amount: expense.amount.toString(),
        description: expense.description || '',
        date: expense.date
      });
    } else {
      setEditingId(null);
      setFormData({ category: 'Maintenance', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(formData.amount);
    if (isNaN(amountNum)) {
      alert('Please enter a valid amount');
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('expenses')
        .update({ ...formData, amount: amountNum })
        .eq('id', editingId);

      if (error) {
        alert(`Failed to update expense: ${error.message}`);
      } else {
        setShowForm(false);
        fetchExpenses();
      }
    } else {
      const { error } = await supabase
        .from('expenses')
        .insert([{ ...formData, amount: amountNum }]);

      if (error) {
        alert(`Failed to add expense: ${error.message}`);
      } else {
        setShowForm(false);
        fetchExpenses();
      }
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) console.error('Error deleting expense:', error);
    else fetchExpenses();
  };

  // Calculations
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const dailyTotal = expenses
    .filter(exp => exp.date === today)
    .reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyTotal = expenses
    .filter(exp => {
      const d = new Date(exp.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const categories = ['Maintenance', 'Electricity', 'Equipment', 'Staff Salary', 'Marketing', 'Other'];

  return (
    <div style={{ color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Expense Tracking</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Monitor and manage your daily operational costs.</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          style={{ 
            backgroundColor: 'var(--accent-green)', 
            color: '#000', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Plus size={20} /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>TODAY'S EXPENSE</p>
            <Wallet size={16} color="var(--accent-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>₹{dailyTotal.toLocaleString()}</h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Spent today</p>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>MONTHLY TOTAL</p>
            <Calendar size={16} color="var(--accent-blue)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>₹{monthlyTotal.toLocaleString()}</h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>For {new Date().toLocaleString('default', { month: 'long' })}</p>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>ANNUAL PROJECTION</p>
            <TrendingUp size={16} color="var(--accent-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>₹{(monthlyTotal * 12).toLocaleString()}</h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Estimated annual burn</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Transaction History</h4>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input 
                type="text" 
                placeholder="Search description..." 
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '8px', color: '#fff', fontSize: '0.875rem', width: '240px' }}
              />
            </div>
            <button style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.625rem 1rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 className="animate-spin" size={40} color="var(--accent-green)" />
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
              <thead>
                <tr style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ textAlign: 'left', padding: '0 1rem' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '0 1rem' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0 1rem' }}>Description</th>
                  <th style={{ textAlign: 'right', padding: '0 1rem' }}>Amount</th>
                  <th style={{ textAlign: 'center', padding: '0 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <td style={{ padding: '1.25rem 1rem', fontSize: '0.875rem' }}>{new Date(exp.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        backgroundColor: 'rgba(0, 255, 136, 0.1)', 
                        color: 'var(--accent-green)',
                        textTransform: 'uppercase'
                      }}>
                        {exp.category}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{exp.description || '-'}</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'right', fontWeight: 700, color: '#ff4d4d' }}>₹{exp.amount.toLocaleString()}</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleOpenForm(exp)}
                          style={{ color: 'rgba(255,255,255,0.2)', border: 'none', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-green)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteExpense(exp.id)}
                          style={{ color: 'rgba(255,255,255,0.2)', border: 'none', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>No expenses recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Expense Modal */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#111', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '480px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>{editingId ? 'Edit Expense' : 'Record New Expense'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    padding: '0.875rem', 
                    borderRadius: '8px', 
                    color: '#fff',
                    outline: 'none'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="What was this for?"
                  rows={3}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff', resize: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: 'none', backgroundColor: 'var(--accent-green)', color: '#000', fontWeight: 700, cursor: 'pointer' }}>
                  {editingId ? 'Update Expense' : 'Save Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
