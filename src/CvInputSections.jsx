import { useState } from "react";
import educationData from "./data/EducationData";

function PersonalInformation({ isActive, onShow }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    number: "09213210982",
    email: "johndoe@gmail.com",
    socialMedia: "https://github.com/johndoe",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  }

  return (
    <section onClick={onShow}>
      <h1>Personal Information</h1>
      {isActive && (
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={personalInfo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="number">Mobile No.</label>
            <input
              type="number"
              name="number"
              id="number"
              value={personalInfo.number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={personalInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="socialMedia">Social Media</label>
            <input
              type="text"
              name="socialMedia"
              id="socialMedia"
              value={personalInfo.socialMedia}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
    </section>
  );
}

function EducationInformation({ isActive, onShow }) {
  const [activeEdit, setActiveEdit] = useState(null);
  const [initialEducationData, setEducationData] = useState(educationData);

  return (
    <section onClick={onShow}>
      <h1>Education</h1>
      {isActive &&
        initialEducationData.map((education, index) => (
          <EducationSection
            institution={education.institution}
            courseTitle={education.courseTitle}
            description={education.description}
            date={education.date}
            grade={education.grade}
            key={education.institution}
            isActiveEdit={activeEdit === index}
            onEdit={() => setActiveEdit(index)}
          ></EducationSection>
        ))}
    </section>
  );
}

function EducationSection(props) {
  return (
    <>
      {props.isActiveEdit ? (
        <form>
          <div>
            <label htmlFor="institution">Institution</label>
            <input
              value={props.institution}
              type="text"
              name="institution"
              id="institution"
            />
          </div>

          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              value={props.courseTitle}
              type="text"
              name="courseTitle"
              id="courseTitle"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              value={props.description}
              type="text"
              name="description"
              id="description"
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input value={props.date} type="text" name="date" id="date" />
          </div>

          <div>
            <label htmlFor="grade">Grade</label>
            <input value={props.grade} type="text" name="grade" id="grade" />
          </div>
          <button>Save</button>
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

export { PersonalInformation, EducationInformation };
