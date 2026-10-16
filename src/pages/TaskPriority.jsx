import { useState } from "react";
import { Link } from "react-router-dom";
import "./TaskPriority.css";

const tasks = [
  {
    rank: 1,
    title: "Database Assignment",
    meta: "INFO 4XXX · Due Oct 15 · Assignment",
    course: "INFO 4XXX",
    dueDate: "Oct 15",
    type: "Assignment",
    priority: "High Priority",
    weight: "25%",
    effort: "4h",
    difficulty: "High",
    deadline: "3 days",
    explanation:
      "This task is due sooner than your other current work, is worth 25% of the course grade, and still requires about 4 hours of focused effort. Because your available study capacity is limited after confirmed commitments are excluded, TimeWise recommends completing this work first while enough feasible study time remains before the deadline.",
  },
  {
    rank: 2,
    title: "Theory of Computation Quiz",
    meta: "INFO 47546 · Due Oct 17 · Quiz",
    course: "INFO 47546",
    dueDate: "Oct 17",
    type: "Quiz",
    priority: "Medium Priority",
    weight: "10%",
    effort: "1.5h",
    difficulty: "Medium",
    deadline: "5 days",
    explanation:
      "This quiz is due within five days and requires about 1.5 hours of focused preparation. It is scheduled after the Database Assignment because that task has greater deadline urgency, grade weight, estimated effort, and difficulty, while enough study capacity still remains to prepare for this quiz before its deadline.",
  },
  {
    rank: 3,
    title: "Cloud Economics Lab",
    meta: "INFO 49971 · Due Oct 19 · Lab",
    course: "INFO 49971",
    dueDate: "Oct 19",
    type: "Lab",
    priority: "Medium Priority",
    weight: "15%",
    effort: "1.5h",
    difficulty: "Medium",
    deadline: "7 days",
    explanation:
      "This lab remains important because it contributes 15% of the course grade and requires about 1.5 hours of work. Its later deadline gives the earlier Database Assignment and Theory of Computation Quiz greater immediate urgency, so TimeWise places this task after them while still reserving a feasible study block before the lab is due.",
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
  const [selectedTask, setSelectedTask] = useState(null);

  function showExplanation(task) {
    setSelectedTask(task);
    window.scrollTo({ top: 0 });
  }

  function returnToPlan() {
    setSelectedTask(null);
    window.scrollTo({ top: 0 });
  }

  if (selectedTask) {
    const affectedBlocks = studyBlocks.filter(
      (block) => block.task === selectedTask.title,
    );

    return (
      <section className="tp-page" aria-labelledby="tp-explanation-title">
        <div className="tp-page-head">
          <div>
            <h1 id="tp-explanation-title">
              Why is this Priority {selectedTask.rank}?
            </h1>

            <div className="subtext tp-subtext">
              TimeWise explains the main factors that caused this task to
              receive its current position in your academic plan.
            </div>
          </div>

          <button className="btn" type="button" onClick={returnToPlan}>
            Back to Study Plan
          </button>
        </div>

        <section className="tp-explanation-summary">
          <div>
            <div className="tp-explanation-task-title">
              {selectedTask.title}
            </div>

            <div className="tp-task-meta">
              {selectedTask.course} · Due {selectedTask.dueDate} ·{" "}
              {selectedTask.type} · Weight {selectedTask.weight}
            </div>
          </div>

          <div className="tp-priority-badge">
            {selectedTask.priority} · Rank {selectedTask.rank}
          </div>
        </section>

        <section className="tp-explanation-grid">
          <div className="panel tp-panel">
            <h2>Priority Factors</h2>

            <div className="tp-panel-subtext">
              These factors are evaluated together; no single factor determines
              the result by itself.
            </div>

            <div className="tp-factor-grid">
              <article className="tp-factor">
                <div className="tp-factor-label">Deadline Urgency</div>

                <div className="tp-factor-value">{selectedTask.deadline}</div>

                <div className="tp-factor-note">
                  The remaining time before the deadline is considered relative
                  to your other current academic tasks.
                </div>
              </article>

              <article className="tp-factor">
                <div className="tp-factor-label">Grade Weight</div>

                <div className="tp-factor-value">{selectedTask.weight}</div>

                <div className="tp-factor-note">
                  Assessment weight helps represent the academic importance of
                  the task.
                </div>
              </article>

              <article className="tp-factor">
                <div className="tp-factor-label">Estimated Effort</div>

                <div className="tp-factor-value">{selectedTask.effort}</div>

                <div className="tp-factor-note">
                  Enough focused study time must remain available before the
                  deadline.
                </div>
              </article>

              <article className="tp-factor">
                <div className="tp-factor-label">Difficulty</div>

                <div className="tp-factor-value">{selectedTask.difficulty}</div>

                <div className="tp-factor-note">
                  More difficult work may require earlier or more focused study
                  time.
                </div>
              </article>

              <article className="tp-factor">
                <div className="tp-factor-label">Available Study Capacity</div>

                <div className="tp-factor-value">9h</div>

                <div className="tp-factor-note">
                  Confirmed classes and commitments are excluded before usable
                  study capacity is considered.
                </div>
              </article>

              <article className="tp-factor">
                <div className="tp-factor-label">Remaining Buffer</div>

                <div className="tp-factor-value">2h</div>

                <div className="tp-factor-note">
                  The current study plan preserves two hours of unscheduled
                  capacity.
                </div>
              </article>
            </div>
          </div>

          <div className="panel tp-panel">
            <h2>Plain-Language Explanation</h2>

            <div className="tp-panel-subtext">
              This explanation is intended to help you understand and review the
              recommendation.
            </div>

            <div className="tp-explanation-box">
              <strong>
                Why {selectedTask.title} is ranked{" "}
                {selectedTask.rank === 1
                  ? "first"
                  : `Priority ${selectedTask.rank}`}
              </strong>

              <p>{selectedTask.explanation}</p>
            </div>

            <div className="tp-plan-impact">
              <h3>How this priority affects your plan</h3>

              {affectedBlocks.map((block) => (
                <article
                  className="tp-block"
                  key={`${block.time}-${block.task}`}
                >
                  <div className="tp-block-time">{block.time}</div>

                  <div className="tp-block-task">{block.task}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="tp-explanation-footer">
          <div className="tp-explanation-hint">
            You remain in control of the plan. Return to the Study Plan to
            review or adjust the recommended study blocks if needed.
          </div>

          <button className="btn primary" type="button" onClick={returnToPlan}>
            Back to Study Plan
          </button>
        </div>
      </section>
    );
  }

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
                <button
                  className="btn primary"
                  type="button"
                  onClick={() => showExplanation(task)}
                >
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
