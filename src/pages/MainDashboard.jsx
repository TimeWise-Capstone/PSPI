import { Link } from 'react-router-dom';

// Hardcoded data for the Inception PSPI (no backend).
const stats = [
  { label: 'Upcoming Deadlines', value: '3' },
  { label: 'Study Hours This Week', value: '8h' },
  { label: 'Tasks In Progress', value: '4' },
  { label: 'Current Workload', value: 'High' },
];

const upcomingWork = [
  { name: 'Database Assignment', meta: 'INFO 4XXX · Due Oct 15 · Weight 25%', priority: 'High Priority' },
  { name: 'Theory of Computation Quiz', meta: 'INFO 47546 · Due Oct 17 · Weight 10%', priority: 'Medium Priority' },
  { name: 'Cloud Economics Lab', meta: 'INFO 49971 · Due Oct 19 · Weight 15%', priority: 'Medium Priority' },
];

const studyBlocks = [
  { time: '6:00–8:00 PM', task: 'Database Assignment' },
  { time: '8:30–9:30 PM', task: 'Theory of Computation Review' },
];

const functionalAreas = [
  { title: 'Courses & Academic Data', text: 'Create, review, and confirm academic information.', to: '/courses' },
  { title: 'Study Planning', text: 'Review priorities, recommended study blocks, and explanations.', to: '/study-plan' },
  { title: 'Analytics', text: 'Understand workload, progress, and study patterns.', to: '/analytics' },
  { title: 'Learning Resources', text: 'Request relevant support for difficult topics or tasks.', to: '/resources' },
];

export default function MainDashboard() {
  return (
    <>
      <h1>Good morning</h1>
      <div className="subtext">
        Here is your current academic workload and today&apos;s recommended plan.
      </div>

      <div className="section-title">Academic Overview</div>
      <section className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="grid">
        <div className="panel">
          <h2>Upcoming Work</h2>
          {upcomingWork.map((t) => (
            <div className="task" key={t.name}>
              <div>
                <div className="task-name">{t.name}</div>
                <div className="task-meta">{t.meta}</div>
              </div>
              <div className="badge">{t.priority}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Today&apos;s Study Plan</h2>
          {studyBlocks.map((b) => (
            <div className="study-block" key={b.time}>
              <div className="study-time">{b.time}</div>
              <div className="study-task">{b.task}</div>
            </div>
          ))}
          <div className="btn-row">
            <Link className="btn primary" to="/study-plan">View Study Plan</Link>
            <Link className="btn" to="/courses">Review Courses</Link>
          </div>
        </div>
      </section>

      <div className="section-title">TimeWise Functional Areas</div>
      <section className="functional-areas">
        {functionalAreas.map((fa) => (
          <Link className="fa-card" to={fa.to} key={fa.title}>
            <strong>{fa.title}</strong>
            <span>{fa.text}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
