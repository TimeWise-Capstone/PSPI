import { useState } from 'react';
import { Link } from 'react-router-dom';

// Hardcoded data for FA3 Inception Release (Rowan McFaul / RM)
const priorityTasks = [
    { name: 'Prepare FA3 Requirements Model Diagrams', meta: 'INFO 49635 · Due Oct 20 · Weight 15%', priority: 'High Priority', status: 'Completed' },
    { name: 'Review ASP.NET Core API Endpoints', meta: 'SYST35300 · Due Oct 24 · Weight 10%', priority: 'Medium Priority', status: 'Upcoming' },
    { name: 'Complete Database Migration Subtask', meta: 'PROG32758 · Due Oct 28 · Weight 5%', priority: 'Medium Priority', status: 'Upcoming' },
];

const studyBlocksToday = [
    { time: '09:00 AM – 10:30 AM', task: 'INFO49635 Capstone (1.5h)', status: 'Completed' },
    { time: '02:00 PM – 03:30 PM', task: 'SYST35300 Cloud Arch (1.5h)', status: 'Upcoming' },
];

const heatmapDays = [
    { day: 'Mon 10/19', hours: '1.5h', status: 'Light Load', type: 'light' },
    { day: 'Tue 10/20', hours: '5.0h', status: 'Peak / Due', type: 'heavy' },
    { day: 'Wed 10/21', hours: '3.0h', status: 'Balanced', type: 'moderate' },
    { day: 'Thu 10/22', hours: '1.0h', status: 'Light Load', type: 'light' },
    { day: 'Fri 10/23', hours: '3.5h', status: 'Quiz Prep', type: 'moderate' },
    { day: 'Sat 10/24', hours: '6.0h', status: 'Overload Risk', type: 'heavy' },
    { day: 'Sun 10/25', hours: '0.0h', status: 'Recovery', type: 'light' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'reminders' | 'heatmap'

    // Reminder settings state
    const [leadTime, setLeadTime] = useState('15 Minutes Before Block');
    const [channels, setChannels] = useState({ banner: true, email: true, push: false });
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSaveReminders = (e) => {
        e.preventDefault();
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <div className="fa3-module-container">
            {/* Sub-navigation for Rowan's FA3 Views */}
            <div className="fa3-subnav" style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #c9c9c9', paddingBottom: '12px' }}>
                <button
                    className={`btn ${activeTab === 'dashboard' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                    type="button"
                >
                    Priority Dashboard
                </button>
                <button
                    className={`btn ${activeTab === 'reminders' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('reminders')}
                    type="button"
                >
                    Reminder Settings
                </button>
                <button
                    className={`btn ${activeTab === 'heatmap' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('heatmap')}
                    type="button"
                >
                    Workload Heatmap
                </button>
            </div>

            {/* VIEW 1: STUDENT PRIORITY DASHBOARD */}
            {activeTab === 'dashboard' && (
                <>
                    <h1>Student Priority Dashboard</h1>
                    <div className="subtext">
                        Overview of your highest-priority work, upcoming study blocks, and active academic deadlines.
                    </div>

                    <div className="section-title">Academic Overview</div>
                    <section className="stats">
                        <div className="stat">
                            <div className="stat-label">Next Deadline</div>
                            <div className="stat-value" style={{ fontSize: '18px', marginTop: '8px' }}>INFO 49635 (Oct 20)</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Target Study Hours</div>
                            <div className="stat-value">4.5h</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Pending Tasks</div>
                            <div className="stat-value">3</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Adherence Streak</div>
                            <div className="stat-value">5 Days</div>
                        </div>
                    </section>

                    <section className="grid">
                        <div className="panel">
                            <h2>Priority Task Queue</h2>
                            {priorityTasks.map((t) => (
                                <div className="task" key={t.name}>
                                    <div>
                                        <div className="task-name">{t.name}</div>
                                        <div className="task-meta">{t.meta}</div>
                                    </div>
                                    <div className={`badge ${t.priority.includes('High') ? 'badge-high' : ''}`}>
                                        {t.priority}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="panel">
                            <h2>Today&apos;s Scheduled Study Blocks</h2>
                            {studyBlocksToday.map((b) => (
                                <div className="study-block" key={b.time}>
                                    <div className="study-time">{b.time}</div>
                                    <div className="study-task">
                                        {b.task} — <strong style={{ color: b.status === 'Completed' ? '#2e7d32' : '#d97706' }}>{b.status}</strong>
                                    </div>
                                </div>
                            ))}
                            <div className="btn-row" style={{ marginTop: '16px' }}>
                                <button className="btn primary" type="button">Start Focus Timer</button>
                                <button className="btn" type="button" onClick={() => setActiveTab('heatmap')}>View Heatmap</button>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* VIEW 2: STUDY REMINDER SETTINGS */}
            {activeTab === 'reminders' && (
                <>
                    <h1>Study Reminder Settings</h1>
                    <div className="subtext">
                        Configure automated contextual notifications and alert lead times prior to scheduled study blocks.
                    </div>

                    <div className="panel" style={{ maxWidth: '750px', marginTop: '20px' }}>
                        <h2>Notification Preferences</h2>
                        {savedNotice && (
                            <div className="res-notice" role="status" style={{ marginBottom: '15px', color: '#2e7d32', background: '#e8f5e9', padding: '10px', borderRadius: '4px' }}>
                                Preferences updated successfully.
                            </div>
                        )}
                        <form onSubmit={handleSaveReminders}>
                            <div style={{ marginBottom: '16px' }}>
                                <label className="stat-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                                    Default Notification Lead Time
                                </label>
                                <select
                                    className="res-select"
                                    value={leadTime}
                                    onChange={(e) => setLeadTime(e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #8d8d8d', borderRadius: '4px' }}
                                >
                                    <option>15 Minutes Before Block</option>
                                    <option>30 Minutes Before Block</option>
                                    <option>1 Hour Before Block</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label className="stat-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                                    Active Notification Channels
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={channels.banner}
                                            onChange={(e) => setChannels({ ...channels, banner: e.target.checked })}
                                        /> In-App Banner Popups (Contextual Overlays)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={channels.email}
                                            onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                                        /> Daily Academic Summary Email Digest
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={channels.push}
                                            onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                                        /> Mobile Push Notifications
                                    </label>
                                </div>
                            </div>

                            <div className="btn-row">
                                <button type="submit" className="btn primary">Save Preferences</button>
                                <button type="button" className="btn" onClick={() => setActiveTab('dashboard')}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            {/* VIEW 3: WORKLOAD HEATMAP */}
            {activeTab === 'heatmap' && (
                <>
                    <h1>Weekly Workload Intensity Heatmap</h1>
                    <div className="subtext">
                        Visualizing daily assignment density and study hours distribution to proactively highlight overload periods.
                    </div>

                    <div className="panel" style={{ marginTop: '20px' }}>
                        <h2>Density Calendar (Oct 19 – Oct 25, 2026)</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '14px' }}>
                            {heatmapDays.map((h) => {
                                let bg = '#e8f5e9';
                                let border = '#388e3c';
                                if (h.type === 'heavy') {
                                    bg = '#ffebee';
                                    border = '#d32f2f';
                                } else if (h.type === 'moderate') {
                                    bg = '#fff8e1';
                                    border = '#fbc02d';
                                }
                                return (
                                    <div
                                        key={h.day}
                                        style={{ border: `1px solid ${border}`, borderRadius: '5px', padding: '12px 8px', background: bg, textAlign: 'center' }}
                                    >
                                        <div style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>{h.day}</div>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0' }}>{h.hours}</div>
                                        <div style={{ fontSize: '11px' }}>{h.status}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: '20px', padding: '14px', background: '#fffde7', border: '1px solid #fbc02d', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span><strong>Engine Recommendation:</strong> High workload density flagged on Tuesday and Saturday.</span>
                            <button className="btn primary" type="button" onClick={() => alert('Automated rebalance applied successfully!')}>Apply Rebalance</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}