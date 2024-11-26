import { useState } from "react";

function EducationCvDisplay(props) {
  return (
    <div>
      <h1>Education</h1>
      <hr></hr>
      {props.educationInfo.map((education) => (
        <div key={education.id}>
          <div>
            <p>{education.institution}</p>
            <p>{education.courseTitle}</p>
          </div>
          <div>
            <p>{education.date}</p>
            <p>{education.grade}</p>
          </div>
          <p>{education.description}</p>
        </div>
      ))}
    </div>
  );
}

function EducationInformation({
  isActive,
  onShow,
  initialEducationData,
  setEducationData,
  submitHandler,
  activeEdit,
  setActiveEdit,
  setEducationCvDisplay,
}) {
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
    setEducationCvDisplay([...initialEducationData, newData]);
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

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function deleteEducationData(e) {
    e.preventDefault();
    const newEducationData = initialEducationData.filter(
      (education) => education.id !== parseInt(e.target.dataset.index),
    );
    setEducationData(newEducationData);
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
            deleteHandler={deleteEducationData}
            changeHandler={inputHandler}
            enterHandler={handleEnterPress}
            submitHandler={submitHandler}
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
              onKeyDown={handleEnterPress}
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
              onKeyDown={handleEnterPress}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={newData.description}
              onChange={newDataInputHandler}
              onKeyDown={handleEnterPress}
              rows={10}
              style={{
                width: "100%",
                resize: "vertical",
              }}
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
              onKeyDown={handleEnterPress}
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
              onKeyDown={handleEnterPress}
            />
          </div>

          <button onClick={() => setActiveEdit(null)}>Cancel</button>
          <button type="submit" onClick={newDataSubmitHandler}>
            Add
          </button>
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
              onKeyDown={props.enterHandler}
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
              onKeyDown={props.enterHandler}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              value={props.description}
              name="description"
              id="description"
              data-index={props.index}
              onChange={props.changeHandler}
              onKeyDown={props.enterHandler}
              rows={10}
              style={{
                width: "100%",
                resize: "vertical",
              }}
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
              onKeyDown={props.enterHandler}
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
              onKeyDown={props.enterHandler}
            />
          </div>
          <div className="buttonsEdit">
            <button data-index={props.index} onClick={props.deleteHandler}>
              Delete
            </button>
            <div>
              <button onClick={props.onCancel}>Cancel</button>
              <button type="submit" onClick={props.submitHandler}>
                Save
              </button>
            </div>
          </div>
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

export { EducationInformation, EducationCvDisplay };
