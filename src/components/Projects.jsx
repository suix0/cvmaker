import { useState } from "react";
import projects from "../data/ProjectsData";

function ProjectsInformation({ isActive, onShow }) {
  const [initialProjectsData, setProjectsData] = useState(projects);
  const [activeEdit, setActiveEdit] = useState(null);

  function editProjectsData() {
    z``;
  }

  return (
    <section onClick={onShow}>
      <h1>Projects</h1>
      {isActive &&
        initialProjectsData.map((projects) => (
          <ProjectSection
            projectObject={projects}
            key={projects.id}
            isActive={activeEdit === projects.id}
            setActive={() => setActiveEdit(projects.id)}
          ></ProjectSection>
        ))}
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
            />
          </div>

          <div>
            <label htmlFor="subHeading">Subheading</label>
            <input
              type="text"
              id="subHeading"
              name="subHeading"
              value={props.projectObject.subHeading}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={props.projectObject.description}
            />
          </div>

          <div>
            <label htmlFor="projectLink">Project Link</label>
            <input
              type="text"
              id="projectLink"
              name="projectLink"
              value={props.projectObject.projectLink}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={props.projectObject.date}
            />
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
