import { useState } from "react";
import experienceData from "../data/ExperienceData";

function ExperienceInformation({ isActive, onShow }) {
  const [initialExperienceData, setExperienceData] = useState(experienceData);
  const [activeEdit, setActiveEdit] = useState(null);
  const [newData, setNewData] = useState({
    id: 3,
    company: "",
    jobTitle: "",
    description: "",
    date: "",
    location: "",
    skills: [],
  });
  const [skills, setSkills] = useState([]);

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
    setNewData({
      id: newData.id + 1,
      company: "",
      jobTitle: "",
      description: "",
      date: "",
      location: "",
      skills: "",
    });
  }

  // Adding skill to yet to add experience
  function handleSkillsArray(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setSkills([...skills, e.target.value]); // Add the entered skill in skills array
      setNewData({ ...newData, skills: "" }); // Reset the value for skills input
    }
  }

  // Adding skills to existing experience
  function handleExistingSkillsArray(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const index = e.target.dataset.index;
      const newExperienceData = initialExperienceData.map((experienceData) => {
        if (experienceData.id === parseInt(index)) {
          experienceData.skillsArr.push(e.target.value);
          experienceData.skills = "";
          return experienceData;
        } else {
          return experienceData;
        }
      });
      setExperienceData(newExperienceData);
    }
  }

  function removeSkill(e) {
    e.preventDefault();
    console.log(e);
  }

  function preventEnterSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  console.log(newData);

  console.log(initialExperienceData);

  return (
    <section onClick={onShow}>
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
          ></ExperienceSection>
        ))}
      {isActive && (
        <div className="innerSections">
          <p>Add Experience</p>
          <button onClick={() => setActiveEdit(0)}>Add</button>
        </div>
      )}

      {isActive && activeEdit === 0 && (
        <form>
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

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={newData.description}
              onChange={handleAddFormInputChange}
              onKeyDown={preventEnterSubmission}
            />
          </div>

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

          <div>
            <label htmlFor="skills">Skills</label>
            <div className="skillsDiv">
              {skills.map((skill) => (
                <div key={skill}>
                  <button onClick={removeSkill}>x</button> {skill}
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
            </div>
          </div>
          <div>
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
        <form>
          <div>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              data-index={props.index}
              value={props.company}
              onChange={props.handleChange}
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
            />
          </div>

          <div>
            <label htmlFor="jobTitle">Description</label>
            <textarea
              name="jobTitle"
              id="jobTitle"
              data-index={props.index}
              value={props.description}
              onChange={props.handleChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              id="date"
              data-index={props.index}
              value={props.date}
              onChange={props.handleChange}
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
            />
          </div>

          <div>
            <label htmlFor="skills">Skills</label>
            <div className="skillsDiv">
              {props.skillsArr.map((skills) => (
                <div key={skills}>
                  <button>x</button>
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
            </div>
          </div>
        </form>
      ) : (
        <div className="innerSections">
          <p>
            <span style={{ fontWeight: "bold" }}>{props.company} •</span>{" "}
            {props.jobTitle}
          </p>
          <button onClick={props.setActive}>Edit</button>
        </div>
      )}
    </>
  );
}

export { ExperienceInformation };
