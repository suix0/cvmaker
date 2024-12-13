import { useState } from "react";
import edit from "../assets/pencil-box.svg";
import add from "../assets/plus-box.svg";

function ExperienceCvDisplay(props) {
  return (
    <div>
      <h1>Professional Experience</h1>
      <hr></hr>
      {props.experience.map((experienceData) => (
        <div key={experienceData.id}>
          <div>
            <p>{experienceData.company}</p>
            <p>{experienceData.jobTitle}</p>
          </div>
          <div>
            <p>
              {experienceData.date}
              <span> • {experienceData.location}</span>
            </p>
            <div>
              {experienceData.skillsArr.map((skill) => (
                <p key={crypto.randomUUID()}>{skill}, </p>
              ))}
            </div>
          </div>
          <div>
            {experienceData.description.split("\n").map((desc) => (
              <p key={crypto.randomUUID()}>{desc}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceInformation({
  isActive,
  onShow,
  initialExperienceData,
  setExperienceData,
  activeEdit,
  setActiveEdit,
  setExperienceCvDisplay,
}) {
  const [newData, setNewData] = useState({
    id: 3,
    company: "",
    jobTitle: "",
    description: "",
    date: "",
    location: "",
    skills: "",
    skillsArr: [],
  });

  function handleFormInputChange(e) {
    const { name, value } = e.target;
    const index = e.target.dataset.index;
    const newExperienceData = initialExperienceData.map((experience) => {
      if (parseInt(index) === experience.id) {
        return { ...experience, [name]: value };
      } else {
        return experience;
      }
    });
    setExperienceData(newExperienceData);
  }

  function handleAddFormInputChange(e) {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  }

  function addNewExperienceData(e) {
    // Increment id of new data for next render
    e.preventDefault();
    setExperienceData([...initialExperienceData, newData]);
    setExperienceCvDisplay([...initialExperienceData, newData]);
    setNewData({
      id: newData.id + 1,
      company: "",
      jobTitle: "",
      description: "",
      date: "",
      location: "",
      skills: "",
      skillsArr: [],
    });
  }

  // Adding skill to yet to add experience
  function handleSkillsArray(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value !== "") {
        // Ensure that it does not accept empty string
        setNewData({
          ...newData,
          skills: "",
          skillsArr: [...newData.skillsArr, e.target.value],
        });
      }
    }
  }

  // Adding skills to existing experience
  function handleExistingSkillsArray(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value !== "") {
        // Ensure that we do not add empty strings
        const index = e.target.dataset.index;
        const newExperienceData = initialExperienceData.map(
          (experienceData) => {
            if (experienceData.id === parseInt(index)) {
              experienceData.skillsArr.push(e.target.value);
              experienceData.skills = "";
              return experienceData;
            } else {
              return experienceData;
            }
          },
        );
        setExperienceData(newExperienceData);
      }
    }
  }

  function removeSkillNewData(e) {
    e.preventDefault();
    const newSkills = newData.skillsArr.filter(
      (skill) => skill !== e.target.id,
    );
    setNewData({ ...newData, skillsArr: newSkills });
  }

  function removeSkillExistingData(e) {
    e.preventDefault();
    const newExperienceArr = initialExperienceData.map((experience) => {
      if (experience.id === parseInt(e.target.dataset.index)) {
        // Retain the skills that do not match the skill we want to remove
        // in order to successfully remove that skill
        const newSkillsArr = experience.skillsArr.filter(
          (skill) => skill !== e.target.id,
        );
        return { ...experience, skillsArr: newSkillsArr };
      } else {
        return experience;
      }
    });
    setExperienceData(newExperienceArr);
    setExperienceCvDisplay(newExperienceArr);
  }

  function preventEnterSubmission(e) {
    if (e.target.name === "description") {
      e.preventDefault();
      if (e.key === "Enter") {
        const newExperienceData = initialExperienceData.map((experience) => {
          if (experience.id === parseInt(e.target.dataset.index)) {
            return {
              ...experience,
              description: (experience.description += "\n"),
            };
          } else {
            return experience;
          }
        });
        setExperienceData(newExperienceData);
      } else if (e.key === "Backspace") {
        const newExperienceData = initialExperienceData.map((experience) => {
          if (experience.id === parseInt(e.target.dataset.index)) {
            return {
              ...experience,
              description: experience.description.slice(
                0,
                experience.description.length - 1,
              ),
            };
          } else {
            return experience;
          }
        });
        setExperienceData(newExperienceData);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function deleteExperienceSection(e) {
    e.preventDefault();
    const newExperienceData = initialExperienceData.filter(
      (experience) => experience.id !== parseInt(e.target.dataset.index),
    );
    setExperienceData(newExperienceData);
    setExperienceCvDisplay(newExperienceData);
  }

  function saveEdit() {
    setExperienceCvDisplay(initialExperienceData);
    setActiveEdit(null);
  }

  return (
    <section onClick={onShow} className="outerSection">
      <h1>Experience</h1>
      {isActive &&
        initialExperienceData.map((experience) => (
          <ExperienceSection
            company={experience.company}
            jobTitle={experience.jobTitle}
            description={experience.description}
            date={experience.date}
            location={experience.location}
            skills={experience.skills}
            skillsArr={experience.skillsArr}
            key={experience.id}
            index={experience.id}
            isActive={activeEdit === experience.id}
            setActive={() => setActiveEdit(experience.id)}
            handleChange={handleFormInputChange}
            handleAddSkills={handleExistingSkillsArray}
            handleCancel={() => setActiveEdit(null)}
            handleDelete={deleteExperienceSection}
            handleDeleteSkill={removeSkillExistingData}
            handleEnter={preventEnterSubmission}
            saveHandler={saveEdit}
          ></ExperienceSection>
        ))}
      {isActive && (
        <div className="innerSections">
          <p>Add Experience</p>
          <button onClick={() => setActiveEdit(0)} className="addBtn">
            <img src={add} alt="Pencil logo add button" />
          </button>
        </div>
      )}

      {isActive && activeEdit === 0 && (
        <form className="forms">
          <div className="formContainer">
            <div>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                value={newData.company}
                onChange={handleAddFormInputChange}
                onKeyDown={preventEnterSubmission}
              />
            </div>

            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={newData.jobTitle}
                onChange={handleAddFormInputChange}
                onKeyDown={preventEnterSubmission}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={newData.description}
              onChange={handleAddFormInputChange}
              rows={10}
              style={{
                whiteSspace: "pre-wrap",
                width: "100%",
                resize: "vertical",
              }}
            />
          </div>

          <div className="formContainer">
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="text"
                name="date"
                id="date"
                value={newData.date}
                onChange={handleAddFormInputChange}
                onKeyDown={preventEnterSubmission}
              />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={newData.location}
                onChange={handleAddFormInputChange}
                onKeyDown={preventEnterSubmission}
              />
            </div>
          </div>

          <div>
            <label htmlFor="skills">Skills</label>
            <p className="skillsDiv">
              {newData.skillsArr.map((skill) => (
                <div key={crypto.randomUUID()}>
                  <button onClick={removeSkillNewData} id={skill}>
                    x
                  </button>{" "}
                  {skill}
                </div>
              ))}
              <input
                type="text"
                name="skills"
                id="skills"
                value={newData.skills}
                onChange={handleAddFormInputChange}
                onKeyDown={handleSkillsArray}
                placeholder="Type a skill and press ENTER"
                className="skills"
              />
            </p>
          </div>
          <div className="addBtnContainer">
            <button onClick={() => setActiveEdit(null)}>Cancel</button>
            <button type="submit" onClick={addNewExperienceData}>
              Add
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function ExperienceSection(props) {
  return (
    <>
      {props.isActive ? (
        <form className="forms">
          <div className="formContainer">
            <div>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                data-index={props.index}
                value={props.company}
                onChange={props.handleChange}
                onKeyDown={props.handleEnter}
              />
            </div>

            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                data-index={props.index}
                value={props.jobTitle}
                onChange={props.handleChange}
                onKeyDown={props.handleEnter}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              data-index={props.index}
              value={props.description}
              onChange={props.handleChange}
              rows={10}
              style={{
                width: "100%",
                resize: "vertical",
              }}
            />
          </div>

          <div className="formContainer">
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="text"
                name="date"
                id="date"
                data-index={props.index}
                value={props.date}
                onChange={props.handleChange}
                onKeyDown={props.handleEnter}
              />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                data-index={props.index}
                value={props.location}
                onChange={props.handleChange}
                onKeyDown={props.handleEnter}
              />
            </div>
          </div>

          <div>
            <label htmlFor="skills">Skills</label>
            <p className="skillsDiv">
              {props.skillsArr.map((skills) => (
                <div
                  key={crypto.randomUUID()}
                  id={skills}
                  data-index={props.index}
                >
                  <button
                    onClick={props.handleDeleteSkill}
                    id={skills}
                    data-index={props.index}
                  >
                    x
                  </button>
                  {skills}
                </div>
              ))}
              <input
                type="text"
                name="skills"
                id="skills"
                data-index={props.index}
                value={props.skills}
                onChange={props.handleChange}
                onKeyDown={props.handleAddSkills}
                placeholder="Type a skill and press ENTER"
                className="skills"
              />
            </p>
          </div>
          <div className="buttonsEdit">
            <button onClick={props.handleDelete} data-index={props.index}>
              Delete
            </button>
            <p>
              <button onClick={props.handleCancel}>Cancel</button>
              <button onClick={props.saveHandler}>Save</button>
            </p>
          </div>
        </form>
      ) : (
        <div className={props.index === 1 ? "innerSections1" : "innerSections"}>
          <p>
            <span style={{ fontWeight: "bold" }}>{props.company} •</span>{" "}
            {props.jobTitle}
          </p>
          <button onClick={props.setActive} className="editBtn">
            <img src={edit} alt="Edit button image" />
          </button>
        </div>
      )}
    </>
  );
}

export { ExperienceInformation, ExperienceCvDisplay };
