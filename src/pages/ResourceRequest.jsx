import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResourceRequest.css';

// Inception PSPI: all data is hardcoded. No backend call and no real ranking (TIM-74).

const COURSES = ['INFO 4XXX · Database Systems', 'INFO 47546 · Theory of Computation', 'INFO 49971 · Cloud Economics'];
const TASKS = ['None', 'Database Assignment', 'Theory of Computation Quiz', 'Cloud Economics Lab'];
const LEVELS = ['Somewhat unsure', 'Struggling', 'Completely stuck'];
const FORMATS = ['Video', 'Article', 'Practice problems', 'Any'];
const HELPFUL_REASONS = ['Clear explanation', 'Right difficulty', 'Good length', 'Good examples'];
const NOT_HELPFUL_REASONS = ['Too advanced', 'Too basic', 'Wrong topic', 'Too long', 'Hard to follow'];

const PERSONAL = [
  {
    id: 'r1', title: 'Normalization Explained: 1NF to BCNF', type: 'Video', length: '18 min',
    provider: 'Open Courseware', match: 'Best match',
    why: "Matches your topic and your preference for video. Short enough to fit before tonight's study block.",
  },
  {
    id: 'r2', title: 'BCNF vs 3NF: Worked Examples', type: 'Article', length: '12 min read',
    provider: 'Database Guide', match: 'Strong match',
    why: 'Walks through the dependency problems you described with step-by-step examples.',
  },
  {
    id: 'r3', title: 'Normalization Practice Set (15 problems)', type: 'Practice problems', length: 'about 40 min',
    provider: 'Study Hub', match: 'Good match',
    why: 'Lets you practice after reviewing the concepts. Fits your Oct 14 study block.',
  },
];

const GENERAL = [
  {
    id: 'g1', title: 'Database Normalization Overview', type: 'Article', length: '10 min read',
    provider: 'Database Guide', match: 'General',
    why: 'Matches your topic. Not ranked for your preferences.',
  },
  {
    id: 'g2', title: 'Intro to Normal Forms (lecture)', type: 'Video', length: '25 min',
    provider: 'Open Courseware', match: 'General',
    why: 'Matches your topic. Not ranked for your preferences.',
  },
];

function Chips({ options, value, onChange }) {
  return (
    <div className="res-chips">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          className={value === o ? 'res-chip selected' : 'res-chip'}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function RequestScreen({ request, setRequest, onSubmit }) {
  const [showError, setShowError] = useState(false);
  const set = (key) => (value) => setRequest({ ...request, [key]: value });
  const invalid = showError && request.topic.trim() === '';

  const submit = (e) => {
    e.preventDefault();
    if (request.topic.trim() === '') {
      setShowError(true);
      return;
    }
    onSubmit();
  };

  return (
    <>
      <div className="res-head">
        <div>
          <h1>Get Help With a Difficult Topic</h1>
          <div className="subtext">
            Tell TimeWise what you are struggling with and it will recommend learning resources that
            fit your course and the time you have.
          </div>
        </div>
        <Link className="btn" to="/">Back to Dashboard</Link>
      </div>

      <section className="res-grid">
        <form className="panel" onSubmit={submit} noValidate>
          <h2>Request Resources</h2>
          <p className="res-panel-sub">
            Choose a course and describe the topic or task. Nothing is changed in your study plan.
          </p>

          <div className="res-two">
            <div className="res-field">
              <label htmlFor="res-course">Course</label>
              <select id="res-course" className="res-select" value={request.course}
                onChange={(e) => set('course')(e.target.value)}>
                {COURSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="res-field">
              <label htmlFor="res-task">Related task (optional)</label>
              <select id="res-task" className="res-select" value={request.task}
                onChange={(e) => set('task')(e.target.value)}>
                {TASKS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="res-field">
            <label htmlFor="res-topic">Topic you are struggling with</label>
            <input id="res-topic" className={invalid ? 'res-input invalid' : 'res-input'}
              value={request.topic} onChange={(e) => set('topic')(e.target.value)}
              placeholder="For example: Database normalization (3NF and BCNF)" />
            {invalid
              ? <div className="res-error">Enter a topic so TimeWise knows what to look for.</div>
              : <div className="res-help">Required. Type your own topic.</div>}
          </div>

          <div className="res-field">
            <span className="res-label">How much does this topic block you?</span>
            <Chips options={LEVELS} value={request.level} onChange={set('level')} />
          </div>

          <div className="res-field">
            <span className="res-label">Preferred format (optional)</span>
            <Chips options={FORMATS} value={request.format} onChange={set('format')} />
          </div>

          <div className="res-field">
            <label htmlFor="res-notes">Anything else TimeWise should know? (optional)</label>
            <textarea id="res-notes" className="res-textarea" value={request.notes}
              onChange={(e) => set('notes')(e.target.value)}
              placeholder="For example: I understand 2NF but get lost on dependencies." />
          </div>

          <div className="btn-row">
            <button type="submit" className="btn primary">Find Resources</button>
            <Link className="btn" to="/">Cancel</Link>
          </div>
        </form>

        <div className="panel">
          <h2>What happens next</h2>
          <p className="res-panel-sub">Your request is used only to find relevant resources for you.</p>
          <div className="res-card">
            <div className="res-card-title">1. TimeWise reviews your request</div>
            <div className="res-meta">Topic, course, and the effort left on the related task.</div>
          </div>
          <div className="res-card">
            <div className="res-card-title">2. Resources are ranked for you</div>
            <div className="res-meta">Based on relevance, your study history, and available time.</div>
          </div>
          <div className="res-card">
            <div className="res-card-title">3. You review and give feedback</div>
            <div className="res-meta">Open any resource and tell TimeWise if it helped.</div>
          </div>
        </div>
      </section>
    </>
  );
}

function ResultsScreen({ request, general, items, feedback, notice, onEdit, onToggleGeneral, onFeedback }) {
  return (
    <>
      <div className="res-head">
        <div>
          <h1>Recommended Learning Resources</h1>
          <div className="subtext">
            {general
              ? 'Resources for your request. Personalized ranking was not available, so these are general recommendations.'
              : 'Resources chosen for your request, ranked from most to least relevant.'}
          </div>
        </div>
        <button type="button" className="btn" onClick={onEdit}>Edit Request</button>
      </div>

      {notice && <div className="res-notice" role="status">{notice}</div>}

      {general && (
        <div className="res-banner">
          <strong>Showing general recommendations</strong>
          TimeWise does not have enough study history to personalize these yet. Results are based on
          your topic only. Giving feedback helps improve them over time.
        </div>
      )}

      <section className="res-summary">
        <div>
          <div className="res-summary-title">{request.topic}</div>
          <div className="res-meta">
            {request.course}
            {request.task !== 'None' ? ` · Related task: ${request.task}` : ''}
          </div>
        </div>
        <div className="badge">{general ? 'General results' : `${items.length} resources found`}</div>
      </section>

      <section className="res-grid">
        <div>
          {items.map((r) => (
            <div className="res-item" key={r.id}>
              <div>
                <div className="res-card-title">{r.title}</div>
                <div className="res-meta">{r.type} {'·'} {r.length} {'·'} Provider: {r.provider}</div>
                <div className="res-why">{general ? '' : 'Why this? '}{r.why}</div>
              </div>
              <div className="res-actions">
                <span className="badge">{r.match}</span>
                <a className="btn small primary" href="#open" onClick={(e) => e.preventDefault()}>
                  Open Resource
                </a>
                <button type="button" className="btn small" onClick={() => onFeedback(r)}>
                  {feedback[r.id] ? 'Feedback sent' : 'Give Feedback'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>About these results</h2>
          <p className="res-panel-sub">
            Resources open on the provider&apos;s site. TimeWise does not copy provider content.
          </p>
          <div className="res-card">
            <div className="res-card-title">Not what you needed?</div>
            <div className="res-meta">
              Edit your request to change the topic or format, or give feedback so future results improve.
            </div>
          </div>
          <div className="btn-row">
            <button type="button" className="btn small" onClick={onEdit}>Edit Request</button>
            <button type="button" className="btn small" onClick={onToggleGeneral}>
              {general ? 'Show personalized results' : 'See general recommendations'}
            </button>
          </div>
        </div>
      </section>

      <div className="res-footer">
        <div className="res-meta">Recommendations do not change your study plan.</div>
        <Link className="btn primary" to="/">Back to Dashboard</Link>
      </div>
    </>
  );
}

function FeedbackScreen({ resource, onCancel, onSubmit }) {
  const [rating, setRating] = useState('helpful');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const reasons = rating === 'helpful' ? HELPFUL_REASONS : NOT_HELPFUL_REASONS;

  return (
    <>
      <div className="res-head">
        <div>
          <h1>Was This Resource Helpful?</h1>
          <div className="subtext">Your feedback helps TimeWise recommend better resources for you.</div>
        </div>
        <button type="button" className="btn" onClick={onCancel}>Back to Results</button>
      </div>

      <section className="res-summary">
        <div>
          <div className="res-summary-title">{resource.title}</div>
          <div className="res-meta">{resource.type} {'·'} {resource.length} {'·'} Provider: {resource.provider}</div>
        </div>
        <div className="badge">{resource.match}</div>
      </section>

      <section className="panel" style={{ maxWidth: 640 }}>
        <h2>Your Feedback</h2>
        <p className="res-panel-sub">Takes less than a minute. Only you can see your feedback.</p>

        <div className="res-rating">
          <button type="button" className={rating === 'helpful' ? 'res-rate selected' : 'res-rate'}
            onClick={() => { setRating('helpful'); setReason(''); }}>Helpful</button>
          <button type="button" className={rating === 'not' ? 'res-rate selected' : 'res-rate'}
            onClick={() => { setRating('not'); setReason(''); }}>Not helpful</button>
        </div>

        <div className="res-field">
          <span className="res-label">
            {rating === 'helpful' ? 'What made it useful? (optional)' : 'What went wrong? (optional)'}
          </span>
          <Chips options={reasons} value={reason} onChange={setReason} />
        </div>

        <div className="res-field">
          <label htmlFor="res-comment">Comments (optional)</label>
          <textarea id="res-comment" className="res-textarea" value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add anything else about this resource." />
        </div>

        <div className="btn-row">
          <button type="button" className="btn primary" onClick={() => onSubmit({ rating, reason, comment })}>
            Submit Feedback
          </button>
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        </div>
      </section>
    </>
  );
}

export default function ResourceRequest() {
  const [screen, setScreen] = useState('request'); // request | results | feedback
  const [general, setGeneral] = useState(false);
  const [request, setRequest] = useState({
    course: COURSES[0], task: TASKS[1], topic: '', level: LEVELS[1], format: FORMATS[0], notes: '',
  });
  const [feedback, setFeedback] = useState({});
  const [active, setActive] = useState(null);
  const [notice, setNotice] = useState('');

  if (screen === 'feedback' && active) {
    return (
      <FeedbackScreen
        resource={active}
        onCancel={() => setScreen('results')}
        onSubmit={(fb) => {
          setFeedback({ ...feedback, [active.id]: fb });
          setNotice(`Thanks. Your feedback on "${active.title}" was recorded.`);
          setScreen('results');
        }}
      />
    );
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        request={request}
        general={general}
        items={general ? GENERAL : PERSONAL}
        feedback={feedback}
        notice={notice}
        onEdit={() => { setNotice(''); setScreen('request'); }}
        onToggleGeneral={() => { setNotice(''); setGeneral(!general); }}
        onFeedback={(r) => { setActive(r); setNotice(''); setScreen('feedback'); }}
      />
    );
  }

  return (
    <RequestScreen
      request={request}
      setRequest={setRequest}
      onSubmit={() => { setGeneral(false); setNotice(''); setScreen('results'); }}
    />
  );
}
