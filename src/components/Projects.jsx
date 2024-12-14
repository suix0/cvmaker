import { useState } from "react";
import edit from "../assets/pencil-box.svg";
import add from "../assets/plus-box.svg";

function ProjectsCvDisplay(props) {
  return (
    <div>
      <h1>Projects</h1>
      <hr></hr>
      <div className="cvSectionDisplayContainer">
        {props.projectsData.map((project) => (
          <div key={project.id} className="cvSectionDisplay">
            <div className="top">
              <div className="left">
                <div>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    className="projectLink"
                  >
                    {project.projectName}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      style={{ width: "12px", marginLeft: "4px" }}
                    >
                      <title>link-variant</title>
                      <path
                        fill="rgb(76 5 25)"
                        d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                      />
                    </svg>
                  </a>
                  <p style={{ color: "rgb(76 5 25)", fontStyle: "italic" }}>
                    {project.subHeading}
                  </p>
                </div>
              </div>
              <div className="right" style={{ color: "rgb(76 5 25)" }}>
                {project.date}
              </div>
            </div>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsInformation({
  isActive,
  onShow,
  initialProjectsData,
  setProjectsData,
  activeEdit,
  setActiveEdit,
  setProjectsDisplay,
}) {
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
    if (e.target.name === "description") {
      e.preventDefault();
      if (e.key === "Enter") {
        const newProjectsData = initialProjectsData.map((projects) => {
          if (projects.id === parseInt(e.target.dataset.index)) {
            return { ...projects, description: (projects.description += "\n") };
          } else {
            return projects;
          }
        });
        setProjectsData(newProjectsData);
      } else if (e.key === "Backspace") {
        const newProjectsData = initialProjectsData.map((projects) => {
          if (projects.id === parseInt(e.target.dataset.index)) {
            return {
              ...projects,
              description: projects.description.slice(
                0,
                projects.description.length - 1,
              ),
            };
          } else {
            return projects;
          }
        });
        setProjectsData(newProjectsData);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function addNewProjectsData(e) {
    e.preventDefault();
    setProjectsData([...initialProjectsData, newProjectsData]); // Add the new project data
    setProjectsDisplay([...initialProjectsData, newProjectsData]);
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
    setProjectsData(newProjects);
    setProjectsDisplay(newProjects);
  }

  function saveEditToDisplay(e) {
    e.preventDefault();
    setProjectsDisplay(initialProjectsData);
    setActiveEdit(null);
  }

  return (
    <section onClick={onShow} className="outerSection">
      <h1>Projects</h1>
      {isActive &&
        initialProjectsData.map((projects, index) => (
          <>
            {index === 0 ? (
              <p style={{ marginBottom: "3rem" }}></p>
            ) : (
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
                handleSave={saveEditToDisplay}
              ></ProjectSection>
            )}
          </>
        ))}
      {isActive && (
        <div className="innerSections">
          <p>Add Project</p>
          <button onClick={() => setActiveEdit(0)} className="addBtn">
            <img src={add} alt="Pencil logo add button" />
          </button>
        </div>
      )}
      {isActive && activeEdit === 0 && (
        <form className="forms">
          <div className="formContainer">
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
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={newProjectsData.description}
              onChange={handleInputChangeNewData}
              rows={10}
              style={{
                width: "100%",
                resize: "vertical",
              }}
            />
          </div>
          <div className="formContainer">
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
          </div>
          <div className="addBtnContainer">
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
        <form className="forms">
          <div className="formContainer">
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
              rows={10}
              style={{
                width: "100%",
                resize: "vertical",
              }}
            />
          </div>

          <div className="formContainer">
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
          </div>
          <div className="buttonsEdit">
            <button data-index={props.index} onClick={props.handleDelete}>
              Delete
            </button>
            <p>
              <button onClick={props.cancelEdit}>Cancel</button>
              <button onClick={props.handleSave}>Save</button>
            </p>
          </div>
        </form>
      ) : (
        <div className={props.index === 1 ? "innerSections1" : "innerSections"}>
          <p>
            <span style={{ fontWeight: "bold" }}>
              {props.projectObject.projectName} •{" "}
            </span>
            {props.projectObject.subHeading}
          </p>
          <button onClick={props.setActive} className="editBtn">
            <img src={edit} alt="Edit Button image" />
          </button>
        </div>
      )}
    </>
  );
}

export { ProjectsInformation, ProjectsCvDisplay };
