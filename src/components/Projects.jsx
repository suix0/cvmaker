import { useState } from "react";
import projects from "../data/projectsData";

function ProjectsInformation({ isActive, onShow }) {
  const [initialProjectsData, setProjectsData] = useState(projects);
  const [activeEdit, setActiveEdit] = useState(null);
  const [newProjectsData, setNewProjectsData] = useState({
    id: 3,
    projectName: "",
    subHeading: "",
    description: "",
    projectLink: "",
    date: "",
  });

  function editProjectsData(e) {
    const { name, value } = e.target;
    const newProjectsData = initialProjectsData.map((projects) => {
      if (projects.id === parseInt(e.target.dataset.index)) {
        return { ...projects, [name]: value };
      } else {
        return projects;
      }
    });
    setProjectsData(newProjectsData);
  }

  function handleInputChangeNewData(e) {
    const { name, value } = e.target;
    setNewProjectsData({ ...newProjectsData, [name]: value });
  }

  function handleEnters(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function addNewProjectsData(e) {
    e.preventDefault();
    setProjectsData([...initialProjectsData, newProjectsData]); // Add the new project data
    setNewProjectsData({
      id: newProjectsData.id + 1,
      projectName: "",
      subHeading: "",
      description: "",
      projectLink: "",
      date: "",
    }); // Reset the new project data for next addition
  }

  function deleteProject(e) {
    e.preventDefault();
    const newProjects = initialProjectsData.filter(
      (project) => project.id !== parseInt(e.target.dataset.index),
    );
    console.log(newProjects);
    setProjectsData(newProjects);
  }

  return (
    <section onClick={onShow}>
      <h1>Projects</h1>
      {isActive &&
        initialProjectsData.map((projects) => (
          <ProjectSection
            projectObject={projects}
            key={projects.id}
            index={projects.id}
            isActive={activeEdit === projects.id}
            setActive={() => setActiveEdit(projects.id)}
            editInput={editProjectsData}
            cancelEdit={() => setActiveEdit(null)}
            preventEnters={handleEnters}
            handleDelete={deleteProject}
          ></ProjectSection>
        ))}
      {isActive && (
        <div className="innerSections">
          <p>Add Project</p>
          <button onClick={() => setActiveEdit(0)}>Add</button>
        </div>
      )}
      {isActive && activeEdit === 0 && (
        <form>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={newProjectsData.projectName}
              onChange={handleInputChangeNewData}
              onKeyDown={handleEnters}
            />
          </div>

          <div>
            <label htmlFor="subHeading">Subheading</label>
            <input
              type="text"
              id="subHeading"
              name="subHeading"
              value={newProjectsData.subHeading}
              onChange={handleInputChangeNewData}
              onKeyDown={handleEnters}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={newProjectsData.description}
              onChange={handleInputChangeNewData}
              onKeyDown={handleEnters}
            />
          </div>

          <div>
            <label htmlFor="projectLink">Project Link</label>
            <input
              type="text"
              id="projectLink"
              name="projectLink"
              value={newProjectsData.projectLink}
              onChange={handleInputChangeNewData}
              onKeyDown={handleEnters}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={newProjectsData.date}
              onChange={handleInputChangeNewData}
              onKeyDown={handleEnters}
            />
          </div>
          <div>
            <button onClick={() => setActiveEdit(null)}>Cancel</button>
            <button onClick={addNewProjectsData}>Add</button>
          </div>
        </form>
      )}
    </section>
  );
}

function ProjectSection(props) {
  return (
    <>
      {props.isActive ? (
        <form>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={props.projectObject.projectName}
              data-index={props.index}
              onChange={props.editInput}
              onKeyDown={props.preventEnters}
            />
          </div>

          <div>
            <label htmlFor="subHeading">Subheading</label>
            <input
              type="text"
              id="subHeading"
              name="subHeading"
              value={props.projectObject.subHeading}
              data-index={props.index}
              onChange={props.editInput}
              onKeyDown={props.preventEnters}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={props.projectObject.description}
              data-index={props.index}
              onChange={props.editInput}
              onKeyDown={props.preventEnters}
            />
          </div>

          <div>
            <label htmlFor="projectLink">Project Link</label>
            <input
              type="text"
              id="projectLink"
              name="projectLink"
              value={props.projectObject.projectLink}
              data-index={props.index}
              onChange={props.editInput}
              onKeyDown={props.preventEnters}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={props.projectObject.date}
              data-index={props.index}
              onChange={props.editInput}
              onKeyDown={props.preventEnters}
            />
          </div>
          <div className="innerSections">
            <button data-index={props.index} onClick={props.handleDelete}>
              Delete
            </button>
            <div>
              <button onClick={props.cancelEdit}>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="innerSections">
          <div>
            <span style={{ fontWeight: "bold" }}>
              {props.projectObject.projectName} •{" "}
            </span>
            {props.projectObject.subHeading}
          </div>
          <button onClick={props.setActive}>Edit</button>
        </div>
      )}
    </>
  );
}

export { ProjectsInformation };
