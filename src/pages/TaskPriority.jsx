import { Link } from "react-router-dom";
import "./TaskPriority.css";

const tasks = [
  {
    rank: 1,
    title: "Database Assignment",
    meta: "INFO 4XXX · Due Oct 15 · Assignment",
    priority: "High Priority",
    weight: "25%",
    effort: "4h",
    difficulty: "High",
    deadline: "3 days",
  },
  {
    rank: 2,
    title: "Theory of Computation Quiz",
    meta: "INFO 47546 · Due Oct 17 · Quiz",
    priority: "Medium Priority",
    weight: "10%",
    effort: "1.5h",
    difficulty: "Medium",
    deadline: "5 days",
  },
  {
    rank: 3,
    title: "Cloud Economics Lab",
    meta: "INFO 49971 · Due Oct 19 · Lab",
    priority: "Medium Priority",
    weight: "15%",
    effort: "1.5h",
    difficulty: "Medium",
    deadline: "7 days",
  },
];

const studyBlocks = [
  {
    time: "Mon Oct 12 · 6:00–8:00 PM",
    task: "Database Assignment",
  },
  {
    time: "Tue Oct 13 · 7:00–9:00 PM",
    task: "Database Assignment",
  },
  {
    time: "Wed Oct 14 · 7:30–9:00 PM",
    task: "Theory of Computation Quiz",
  },
  {
    time: "Thu Oct 15 · 6:30–8:00 PM",
    task: "Cloud Economics Lab",
  },
];

export default function TaskPriority() {
  return (
    <section className="tp-page" aria-labelledby="tp-title">
      <div className="tp-page-head">
        <div>
          <h1 id="tp-title">Priority / Study Plan</h1>
          <div className="subtext tp-subtext">
            Review your prioritized academic work, recommended study blocks, and
            the reasons behind the plan.
          </div>
        </div>

        <button className="btn" type="button">
          Regenerate Plan
        </button>
      </div>

      <section className="tp-summary-grid" aria-label="Study plan summary">
        <article className="tp-summary-card">
          <div className="tp-summary-label">Available Study Capacity</div>
          <div className="tp-summary-value">9h</div>
        </article>

        <article className="tp-summary-card">
          <div className="tp-summary-label">Planned Study Time</div>
          <div className="tp-summary-value">7h</div>
        </article>

        <article className="tp-summary-card">
          <div className="tp-summary-label">Remaining Study Capacity</div>
          <div className="tp-summary-value">2h</div>
        </article>

        <article className="tp-summary-card">
          <div className="tp-summary-label">Plan Status</div>
          <div className="tp-summary-value">Feasible</div>
        </article>
      </section>

      <section className="tp-main-grid">
        <div className="panel tp-panel">
          <h2>Prioritized Academic Work</h2>

          <div className="tp-panel-subtext">
            Priorities consider deadline urgency, grade weight, estimated
            effort, difficulty, and remaining study capacity.
          </div>

          {tasks.map((task) => (
            <article className="tp-task-card" key={task.rank}>
              <div className="tp-task-top">
                <div
                  className="tp-rank"
                  aria-label={`Priority rank ${task.rank}`}
                >
                  {task.rank}
                </div>

                <div>
                  <div className="tp-task-title">{task.title}</div>

                  <div className="tp-task-meta">{task.meta}</div>
                </div>

                <div className="tp-priority-badge">{task.priority}</div>
              </div>

              <div className="tp-task-details">
                <div className="tp-detail">
                  <span>Grade Weight</span>
                  {task.weight}
                </div>

                <div className="tp-detail">
                  <span>Estimated Effort</span>
                  {task.effort}
                </div>

                <div className="tp-detail">
                  <span>Difficulty</span>
                  {task.difficulty}
                </div>

                <div className="tp-detail">
                  <span>Deadline</span>
                  {task.deadline}
                </div>
              </div>

              <div className="tp-action-row">
                <button className="btn primary" type="button">
                  Why this?
                </button>

                <button className="btn" type="button">
                  Adjust Study Block
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="panel tp-panel">
          <h2>Recommended Study Blocks</h2>

          <div className="tp-panel-subtext">
            Study blocks are placed only within available study windows and
            avoid confirmed commitments.
          </div>

          {studyBlocks.map((block) => (
            <article className="tp-block" key={`${block.time}-${block.task}`}>
              <div className="tp-block-time">{block.time}</div>

              <div className="tp-block-task">{block.task}</div>
            </article>
          ))}

          <div className="tp-capacity-note">
            Confirmed classes, work, and blocked commitments are excluded from
            scheduling. Remaining unscheduled capacity: 2h.
          </div>

          <div className="tp-accept-row">
            <Link className="btn" to="/">
              Cancel
            </Link>

            <button className="btn primary" type="button">
              Accept Plan
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
