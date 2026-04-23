import React from 'react';

export function AuditLogs() {
  const logs = [
    { id: 1, action: 'Approved Booking B-102', user: 'Admin (Super)', date: '2026-04-23 14:30', entity: 'Booking', changes: 'Status: pending -> approved' },
    { id: 2, action: 'Updated Pricing', user: 'Admin (Manager)', date: '2026-04-23 11:15', entity: 'Settings', changes: 'Pickleball rate: 700 -> 800' },
    { id: 3, action: 'Added Expense', user: 'Admin (Super)', date: '2026-04-22 09:00', entity: 'Expense', changes: 'Amount: 2500, Category: Maintenance' },
    { id: 4, action: 'Rejected Booking B-099', user: 'Admin (Manager)', date: '2026-04-21 18:45', entity: 'Booking', changes: 'Status: pending -> rejected' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Audit Logs</h1>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <tr>
              <th>Date & Time</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Performed By</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="text-secondary text-sm">{log.date}</td>
                <td style={{ fontWeight: 500 }}>{log.action}</td>
                <td><span className="badge badge-pending">{log.entity}</span></td>
                <td>{log.user}</td>
                <td className="text-muted text-sm">{log.changes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
