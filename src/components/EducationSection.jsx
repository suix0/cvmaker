import { useState } from "react";
import educationData from "../data/EducationData";

function EducationInformation({ isActive, onShow }) {
  const [activeEdit, setActiveEdit] = useState(null);
  const [initialEducationData, setEducationData] = useState(educationData);
  const [nextId, setNextId] = useState(3);
  const [newData, setNewData] = useState({
    id: nextId,
    institution: "",
    courseTitle: "",
    description: "",
    date: "",
    grade: "",
  });

  function inputHandler(e) {
    const {
      name,
      value,
      dataset: { index: dataIndex },
    } = e.target;

    const newEducationData = initialEducationData.map((education) => {
      if (education.id === parseInt(dataIndex)) {
        return { ...education, [name]: value };
      } else {
        return education;
      }
    });

    setEducationData(newEducationData);
  }

  function newDataInputHandler(e) {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  }

  function newDataSubmitHandler(e) {
    e.preventDefault();
    setEducationData([...initialEducationData, newData]);
    setNextId(nextId + 1);
    setNewData({
      id: nextId + 1,
      institution: "",
      courseTitle: "",
      description: "",
      date: "",
      grade: "",
    });
    setActiveEdit(null);
  }

  return (
    <section onClick={onShow}>
      <h1>Education</h1>
      {isActive &&
        initialEducationData.map((education) => (
          <EducationSection
            institution={education.institution}
            courseTitle={education.courseTitle}
            description={education.description}
            date={education.date}
            grade={education.grade}
            key={education.id}
            index={education.id}
            isActiveEdit={activeEdit === education.id}
            onEdit={() => setActiveEdit(education.id)}
            onCancel={() => setActiveEdit(null)}
            changeHandler={inputHandler}
          ></EducationSection>
        ))}
      {activeEdit === 0 ? (
        <form onSubmit={newDataSubmitHandler}>
          <p>Add Education</p>
          <div>
            <label htmlFor="institution">Institution</label>
            <input
              type="text"
              name="institution"
              id="institution"
              value={newData.institution}
              onChange={newDataInputHandler}
            />
          </div>

          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              type="text"
              name="courseTitle"
              id="courseTitle"
              value={newData.courseTitle}
              onChange={newDataInputHandler}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={newData.description}
              onChange={newDataInputHandler}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              id="date"
              value={newData.date}
              onChange={newDataInputHandler}
            />
          </div>

          <div>
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              name="grade"
              id="grade"
              value={newData.grade}
              onChange={newDataInputHandler}
            />
          </div>

          <button onClick={() => setActiveEdit(null)}>Cancel</button>
          <button type="submit">Add</button>
        </form>
      ) : (
        isActive && (
          <div className="innerSections">
            <p>Add Education</p>
            <button onClick={() => setActiveEdit(0)}>Add</button>
          </div>
        )
      )}
    </section>
  );
}

function EducationSection(props) {
  return (
    <>
      {props.isActiveEdit ? (
        <form>
          <h4>Edit Education</h4>
          <div>
            <label htmlFor="institution">Institution</label>
            <input
              value={props.institution}
              type="text"
              name="institution"
              id="institution"
              data-index={props.index}
              onChange={props.changeHandler}
            />
          </div>

          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              value={props.courseTitle}
              type="text"
              name="courseTitle"
              id="courseTitle"
              data-index={props.index}
              onChange={props.changeHandler}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              value={props.description}
              type="text"
              name="description"
              id="description"
              data-index={props.index}
              onChange={props.changeHandler}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              value={props.date}
              type="text"
              name="date"
              id="date"
              data-index={props.index}
              onChange={props.changeHandler}
            />
          </div>

          <div>
            <label htmlFor="grade">Grade</label>
            <input
              value={props.grade}
              type="text"
              name="grade"
              id="grade"
              data-index={props.index}
              onChange={props.changeHandler}
            />
          </div>
          <button onClick={props.onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div key={props.institution} className="innerSections">
          <p>
            <span style={{ fontWeight: "bold" }}>{props.institution} • </span>{" "}
            {props.courseTitle}
          </p>
          <button className="editBtn" onClick={props.onEdit}>
            Edit
          </button>
        </div>
      )}
    </>
  );
}

export { EducationInformation };
