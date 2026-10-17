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
  const [editingCourse, setEditingCourse] = useState(null);
  const [assessmentCourseId, setAssessmentCourseId] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);

  function saveCourse(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();
    const code = data.get("code").trim();
    const term = data.get("term").trim();

    if (!name || !code || !term) return;

    setCourses((current) =>
      editingCourse
        ? current.map((course) =>
            course.id === editingCourse.id
              ? { ...course, name, code, term }
              : course
          )
        : [
            ...current,
            {
              id: crypto.randomUUID(),
              name,
              code,
              term,
              assessments: [],
            },
          ]
    );

    setEditingCourse(null);
    setShowForm(false);
  }

  function saveAssessment(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();

    if (!name) return;

    const assessment = {
      id: editingAssessment?.id ?? crypto.randomUUID(),
      name,
      type: data.get("type"),
      dueDate: data.get("dueDate"),
      weight: Number(data.get("weight")),
    };

    setCourses((current) =>
      current.map((course) =>
        course.id === assessmentCourseId
          ? {
              ...course,
              assessments: editingAssessment
                ? course.assessments.map((existing) =>
                    existing.id === editingAssessment.id
                      ? assessment
                      : existing
                  )
                : [...course.assessments, assessment],
            }
          : course
      )
    );

    setAssessmentCourseId(null);
    setEditingAssessment(null);
  }

  if (selectedAssessment !== null) {
    return (
      <section className="ai-page">
        <h1>Assessment Details</h1>
        <p className="subtext">
          Review the assessment information.
        </p>

        <div className="panel">
          <div className="ai-assessment-header">
            <h2>{selectedAssessment.name}</h2>

            <button
              className="btn"
              type="button"
              onClick={() => {
                setEditingAssessment(selectedAssessment);
                setAssessmentCourseId(selectedAssessment.courseId);
                setSelectedAssessment(null);
              }}
            >
              Edit Assessment
            </button>
          </div>

          <dl className="ai-details">
            <div>
              <dt>Course</dt>
              <dd>{selectedAssessment.courseCode}</dd>
            </div>

            <div>
              <dt>Assessment Type</dt>
              <dd>{selectedAssessment.type}</dd>
            </div>

            <div>
              <dt>Due Date</dt>
              <dd>{selectedAssessment.dueDate}</dd>
            </div>

            <div>
              <dt>Grade Weight</dt>
              <dd>{selectedAssessment.weight}%</dd>
            </div>
          </dl>
        </div>

        <div className="btn-row">
          <button
            className="btn"
            type="button"
            onClick={() => setSelectedAssessment(null)}
          >
            Back to Courses
          </button>
        </div>
      </section>
    );
  }

  if (assessmentCourseId !== null) {
    const course = courses.find(
      (course) => course.id === assessmentCourseId
    );

    return (
      <section className="ai-page">
        <h1>
          {editingAssessment ? "Edit Assessment" : "Add Assessment"}
        </h1>
        <p className="subtext">
          Enter assessment information for {course.code}.
        </p>

        <form className="panel ai-form" onSubmit={saveAssessment}>
          <label>
            Assessment Name
            <input
              name="name"
              defaultValue={editingAssessment?.name ?? ""}
              required
              pattern=".*\S.*"
            />
          </label>

          <label>
            Assessment Type
            <select
              name="type"
              defaultValue={editingAssessment?.type ?? "Assignment"}
            >
              <option>Assignment</option>
              <option>Quiz</option>
              <option>Exam</option>
              <option>Lab</option>
              <option>Project</option>
            </select>
          </label>

          <label>
            Due Date
            <input
              name="dueDate"
              type="date"
              defaultValue={editingAssessment?.dueDate ?? ""}
              required
            />
          </label>

          <label>
            Grade Weight (%)
            <input
              name="weight"
              type="number"
              min="0"
              max="100"
              step="0.1"
              defaultValue={editingAssessment?.weight ?? ""}
              required
            />
          </label>

          <div className="btn-row">
            <button
              className="btn"
              type="button"
              onClick={() => {
                setAssessmentCourseId(null);
                setEditingAssessment(null);
              }}
            >
              Cancel
            </button>

            <button className="btn primary" type="submit">
              Save Assessment
            </button>
          </div>
        </form>
      </section>
    );
  }

  if (showForm) {
    return (
      <section className="ai-page">
        <h1>{editingCourse ? "Edit Course" : "Add Course"}</h1>
        <p className="subtext">Enter your course information.</p>

        <form className="panel ai-form" onSubmit={saveCourse}>
          <label>
            Course Name
            <input
              name="name"
              defaultValue={editingCourse?.name ?? ""}
              required
              pattern=".*\S.*"
            />
          </label>

          <label>
            Course Code
            <input
              name="code"
              defaultValue={editingCourse?.code ?? ""}
              required
              pattern=".*\S.*"
            />
          </label>

          <label>
            Academic Term
            <input
              name="term"
              defaultValue={editingCourse?.term ?? ""}
              placeholder="Fall 2026"
              required
              pattern=".*\S.*"
            />
          </label>

          <div className="btn-row">
            <button
              className="btn"
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingCourse(null);
              }}
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
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
        >
          Add Course
        </button>
      </div>

      <h2 className="section-title">My Courses</h2>

      <div className="ai-course-list">
        {courses.map((course) => (
          <article className="panel" key={course.id}>
            <div className="ai-assessment-header">
              <h2>
                {course.code} — {course.name}
              </h2>

              <button
                className="btn"
                type="button"
                onClick={() => {
                  setEditingCourse(course);
                  setShowForm(true);
                }}
              >
                Edit Course
              </button>
            </div>

            <p className="muted">{course.term}</p>
            <p>
              {course.assessments.length}{" "}
              {course.assessments.length === 1
                ? "assessment"
                : "assessments"}
            </p>

            {course.assessments.map((assessment) => (
              <div className="ai-assessment" key={assessment.id}>
                <div className="ai-assessment-header">
                  <strong>{assessment.name}</strong>

                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      setSelectedAssessment({
                        ...assessment,
                        courseId: course.id,
                        courseCode: course.code,
                      })
                    }
                  >
                    View Details
                  </button>
                </div>

                <p className="muted">
                  {assessment.type} · Due {assessment.dueDate} · Weight{" "}
                  {assessment.weight}%
                </p>
              </div>
            ))}

            <button
              className="btn"
              type="button"
              onClick={() => {
                setEditingAssessment(null);
                setAssessmentCourseId(course.id);
              }}
            >
              Add Assessment
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}