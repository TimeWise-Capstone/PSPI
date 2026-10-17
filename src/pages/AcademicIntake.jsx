import { useState } from "react";
import "./AcademicIntake.css";

export default function AcademicIntake() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Programming",
      code: "PROG 3001",
      term: "Fall 2026",
      assessments: [],
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  function saveCourse(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();
    const code = data.get("code").trim();
    const term = data.get("term").trim();

    if (!name || !code || !term) {
      event.currentTarget.reportValidity();
      return;
    }

    setCourses((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
        code,
        term,
        assessments: [],
      },
    ]);

    setShowForm(false);
  }

  if (showForm) {
    return (
      <section className="ai-page">
        <h1>Add Course</h1>
        <p className="subtext">Enter your course information.</p>

        <form className="panel ai-form" onSubmit={saveCourse}>
          <label>
            Course Name
            <input name="name" required pattern=".*\S.*" />
          </label>

          <label>
            Course Code
            <input name="code" required pattern=".*\S.*" />
          </label>

          <label>
            Academic Term
            <input
              name="term"
              placeholder="Fall 2026"
              required
              pattern=".*\S.*"
            />
          </label>

          <div className="btn-row">
            <button
              className="btn"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button className="btn primary" type="submit">
              Save Course
            </button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="ai-page">
      <h1>Courses & Assessments</h1>
      <p className="subtext">
        Manage your courses and assessment information.
      </p>

      <div className="btn-row">
        <button
          className="btn primary"
          type="button"
          onClick={() => setShowForm(true)}
        >
          Add Course
        </button>
      </div>

      <h2 className="section-title">My Courses</h2>

      <div className="ai-course-list">
        {courses.map((course) => (
          <article className="panel" key={course.id}>
            <h2>{course.code} — {course.name}</h2>
            <p className="muted">{course.term}</p>
            <p>{course.assessments.length} assessments</p>
          </article>
        ))}
      </div>
    </section>
  );
}