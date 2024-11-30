import { useState } from "react";
import React from "react";
import { PersonalInformation, PersonalInformationCvOutput } from "./Personal";
import { EducationInformation, EducationCvDisplay } from "./Education";
import { ExperienceInformation, ExperienceCvDisplay } from "./Experience";
import { ProjectsInformation, ProjectsCvDisplay } from "./Projects";
import { CustomSectionForm, CustomSectionCvDisplay } from "./CustomSection";
import educationData from "../data/educationData";
import experienceData from "../data/experienceData";
import projects from "../data/projectsData";

let nextActiveIndex = 4;
function CvInput() {
  // Accordion logic in CV form sections
  const [activeIndex, setActive] = useState(0);

  // CV Information States
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    number: "09213210982",
    email: "johndoe@gmail.com",
    socialMedia: "https://github.com/johndoe",
  });

  // Educaton Information state
  const [initialEducationData, setEducationData] = useState(educationData);
  const [educationCvDisplay, setEducationDisplay] = useState(educationData);
  const [activeEditEducation, setActiveEditEducation] = useState(null);

  // Experience Information state
  const [initialExperienceData, setExperienceData] = useState(experienceData);
  const [experienceCvDisplay, setExperienceDisplay] = useState(experienceData);
  const [activeEditExperience, setActiveEditExperience] = useState(null);

  // Projects Information state
  const [initialProjectsData, setProjectsData] = useState(projects);
  const [projectsCvDisplay, setProjectsDisplay] = useState(projects);
  const [activeEditProjects, setActiveEditProjects] = useState(null);

  // Custom Sections
  const [customSectionTitle, setTitle] = useState("");
  const [customSection, setCustomSectionData] = useState([]);
  const [customSectionCvDisplay, setCustomSectionCvDisplay] = useState([]);
  // Personal info state change handler
  function handleIputPersonalInfo(e) {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  }

  // Education section
  // Submit handler
  function educationInfoSubmit(e) {
    e.preventDefault();
    setEducationDisplay(initialEducationData);
    setActiveEditEducation(null);
  }

  // Add Custom Section handler
  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (customSectionTitle !== "") {
      setCustomSectionData([
        ...customSection,
        {
          id: nextActiveIndex,
          title: customSectionTitle,
          customSectionData: [],
        },
      ]);
      setCustomSectionCvDisplay([
        ...customSection,
        {
          id: nextActiveIndex,
          title: customSectionTitle,
          customSectionData: [],
        },
      ]);
      nextActiveIndex++;
      setTitle("");
    }
  }

  function deleteCustomSection(e) {
    e.preventDefault();
    const newCustomData = customSection.filter(
      (custom) => custom.title !== e.target.dataset.customSectionName,
    );
    setCustomSectionData(newCustomData);
  }

  return (
    <main className="main">
      <div className="cvInput">
        <div className="cvInputHeading">
          <div>
            <p>
              cv<span>maker</span>
            </p>
            <br></br>
            <p>
              by <span>suix0</span>
            </p>
          </div>
          <button>Download PDF</button>
        </div>

        <div className="cvForm">
          <p>Resume data:</p>
          <button className="resetBtn">Reset</button>
          <PersonalInformation
            isActive={activeIndex === 0}
            onShow={() => setActive(0)}
            personalInfo={personalInfo}
            handleInputChange={handleIputPersonalInfo}
          ></PersonalInformation>
          <EducationInformation
            isActive={activeIndex === 1}
            onShow={() => setActive(1)}
            initialEducationData={initialEducationData}
            setEducationData={setEducationData}
            setEducationCvDisplay={setEducationDisplay}
            submitHandler={educationInfoSubmit}
            activeEdit={activeEditEducation}
            setActiveEdit={setActiveEditEducation}
          ></EducationInformation>
          <ExperienceInformation
            isActive={activeIndex === 2}
            onShow={() => setActive(2)}
            initialExperienceData={initialExperienceData}
            setExperienceData={setExperienceData}
            setExperienceCvDisplay={setExperienceDisplay}
            activeEdit={activeEditExperience}
            setActiveEdit={setActiveEditExperience}
          ></ExperienceInformation>
          <ProjectsInformation
            isActive={activeIndex === 3}
            onShow={() => setActive(3)}
            initialProjectsData={initialProjectsData}
            setProjectsData={setProjectsData}
            setProjectsDisplay={setProjectsDisplay}
            activeEdit={activeEditProjects}
            setActiveEdit={setActiveEditProjects}
          ></ProjectsInformation>
          {customSection.map((custom) => (
            <CustomSectionInformation
              customSectionTitle={custom.title}
              fullCustomData={customSection}
              customSection={custom}
              deleteHandler={deleteCustomSection}
              setCustomSectionData={setCustomSectionData}
              setCustomDisplay={setCustomSectionCvDisplay}
              key={custom.id}
              isActive={activeIndex === custom.id}
              onShow={() => setActive(custom.id)}
            ></CustomSectionInformation>
          ))}
          <AddCustomSection
            handleSubmit={handleSubmit}
            customSectionTitle={customSectionTitle}
            handleInputChange={handleInputChange}
          ></AddCustomSection>
        </div>
      </div>
      <div>
        <div>
          <PersonalInformationCvOutput
            personalInfo={personalInfo}
          ></PersonalInformationCvOutput>
          <EducationCvDisplay
            educationInfo={educationCvDisplay}
          ></EducationCvDisplay>
          <ExperienceCvDisplay
            experience={experienceCvDisplay}
          ></ExperienceCvDisplay>
          <ProjectsCvDisplay
            projectsData={projectsCvDisplay}
          ></ProjectsCvDisplay>
          <CustomSectionCvDisplay
            customData={customSectionCvDisplay}
          ></CustomSectionCvDisplay>
        </div>
      </div>
    </main>
  );
}

function AddCustomSection(props) {
  return (
    <section>
      <h1>Add Custom Title</h1>
      <form onSubmit={props.handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            id="custom"
            name="custom"
            placeholder="Section Title"
            style={{ flex: "1", marginRight: "8px" }}
            value={props.customSectionTitle}
            onChange={props.handleInputChange}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </section>
  );
}

function CustomSectionInformation(props) {
  const [formActive, setFormActive] = useState(null);
  const [initialFormData, setFormData] = useState({
    id: 1,
    heading: "",
    subHeading: "",
    description: "",
    date: "",
    additionalInfo: "",
  });

  function inputFormHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...initialFormData, [name]: value });
  }

  function editInputFormHandler(e) {
    const { name, value } = e.target;
    const newCustomData = props.customSection.customSectionData.map((data) => {
      if (data.id === parseInt(e.target.dataset.index)) {
        return { ...data, [name]: value };
      } else {
        return data;
      }
    });
    const newFullCustomData = props.fullCustomData.map((data) => {
      if (data.id === props.customSection.id) {
        return { ...data, customSectionData: newCustomData };
      } else {
        return data;
      }
    });
    props.setCustomSectionData(newFullCustomData);
    props.setCustomDisplay(newFullCustomData);
  }

  function addFormData(e) {
    e.preventDefault();
    const updatedCustomData = props.fullCustomData.map((customData) => {
      if (customData.id === parseInt(e.target.dataset.index)) {
        return {
          ...customData,
          customSectionData: [...customData.customSectionData, initialFormData],
        };
      } else {
        return customData;
      }
    });
    props.setCustomSectionData(updatedCustomData);
    props.setCustomDisplay(updatedCustomData);
    setFormData({
      id: initialFormData.id + 1,
      heading: "",
      subHeading: "",
      description: "",
      date: "",
      additionalInfo: "",
    });
    setFormActive(null);
  }

  function deleteInnerSections(e) {
    e.preventDefault();
    const newCustomDataArray = props.customSection.customSectionData.filter(
      (customData) => customData.id !== parseInt(e.target.dataset.index),
    ); // New custom inner section array (heading, subheading, etc. object inside the array of the custom section)
    const newCustomSection = {
      ...props.customSection,
      customSectionData: newCustomDataArray,
    }; // Reflect the updated arr to the original custom section object in a new variable
    const newCustomData = props.fullCustomData.map((data) => {
      if (data.id === newCustomSection.id) {
        return newCustomSection;
      } else {
        return data;
      }
    }); // Update the entire custom data array
    props.setCustomSectionData(newCustomData);
  }

  function preventEnters(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function cancelForm(e) {
    e.preventDefault();
    setFormActive(null);
  }

  return (
    <section onClick={props.onShow}>
      <div className="innerSections">
        <h1>{props.customSectionTitle}</h1>
        <button
          data-custom-section-name={props.customSectionTitle}
          onClick={props.deleteHandler}
        >
          Delete
        </button>
      </div>
      {props.isActive && (
        <>
          {props.customSection.customSectionData.map((customData) => (
            <React.Fragment key={customData.id}>
              {formActive === customData.id ? (
                <CustomSectionForm
                  formData={customData}
                  key={customData.id}
                  inputChangeHandler={editInputFormHandler}
                  submitHandler={addFormData}
                  enterHandler={preventEnters}
                  cancelFormHandler={cancelForm}
                  isActive={formActive === customData.id}
                  index={customData.id}
                  deleteHandler={deleteInnerSections}
                ></CustomSectionForm>
              ) : (
                <div className="innerSections" key={customData.id}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      {customData.heading} •{" "}
                    </span>
                    {customData.subHeading}
                  </p>
                  <button onClick={() => setFormActive(customData.id)}>
                    Edit
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="innerSections">
            <p>Add Item</p>
            <button onClick={() => setFormActive(0)}>Add</button>
          </div>
        </>
      )}
      {props.isActive && formActive === 0 && (
        <CustomSectionForm
          formData={initialFormData}
          inputChangeHandler={inputFormHandler}
          submitHandler={addFormData}
          enterHandler={preventEnters}
          cancelHandler={cancelForm}
          index={props.customSection.id}
          cancelEditHandler={() => setFormActive(null)}
        ></CustomSectionForm>
      )}
    </section>
  );
}

export { CvInput };
