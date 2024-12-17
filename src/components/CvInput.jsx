import { useState } from "react";
import React from "react";
import { PersonalInformation, PersonalInformationCvOutput } from "./Personal";
import { EducationInformation, EducationCvDisplay } from "./Education";
import { ExperienceInformation, ExperienceCvDisplay } from "./Experience";
import { ProjectsInformation, ProjectsCvDisplay } from "./Projects";
import {
  CustomSectionFormEdit,
  CustomSectionFormAdd,
  CustomSectionCvDisplay,
} from "./CustomSection";
import educationData from "../data/educationData";
import experienceData from "../data/experienceData";
import projects from "../data/projectsData";
import edit from "../assets/pencil-box.svg";
import del from "../assets/delete1.svg";
import add from "../assets/plus-box.svg";

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
  const [socialMedia, setSocialMedia] = useState(0); // 0 - linkedin, 1 - github, 2 - X

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

  function handleSubmitEdit(e) {
    e.preventDefault();
    setCustomSectionCvDisplay(customSection);
  }

  function deleteCustomSection(e) {
    e.preventDefault();
    const newCustomData = customSection.filter(
      (custom) => custom.title !== e.target.dataset.customSectionName,
    );
    setCustomSectionData(newCustomData);
    setCustomSectionCvDisplay(newCustomData);
  }

  function handleSocialMediaChange(e) {
    e.preventDefault();
    const num = parseInt(e.target.id);
    if (num === 0) {
      setSocialMedia(0);
    } else if (num === 1) {
      setSocialMedia(1);
    } else if (num === 2) {
      setSocialMedia(2);
    }
  }

  return (
    <main className="main">
      <div className="cvInput">
        <div className="cvInputHeading">
          <div>
            <p>
              cv
              <span style={{ color: "#76abae", fontWeight: "bold" }}>
                maker
              </span>
            </p>
            <br></br>
            <p>
              by{" "}
              <span style={{ color: "#76abae", fontWeight: "bold" }}>
                suix0
              </span>
            </p>
          </div>
          <button className="downloadBtn">Download PDF</button>
        </div>

        <div className="cvForm">
          <p>Resume data:</p>
          <PersonalInformation
            isActive={activeIndex === 0}
            onShow={() => setActive(0)}
            personalInfo={personalInfo}
            handleInputChange={handleIputPersonalInfo}
            socialMediaHandler={handleSocialMediaChange}
            socialMediaVal={socialMedia}
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
              editSubmitHandler={handleSubmitEdit}
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
      <div className="cvDisplayContainer">
        <div>
          <PersonalInformationCvOutput
            personalInfo={personalInfo}
            socialMedia={socialMedia}
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
    <section className="outerSection">
      <h1>Add Custom Title</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <input
          type="text"
          id="custom"
          name="custom"
          placeholder="Section Title"
          style={{
            flex: "1",
            marginRight: "8px",
            padding: "0.5rem",
            border: "1px solid #76abae",
            outlineColor: "#76abae",
            borderRadius: "8px",
          }}
          value={props.customSectionTitle}
          onChange={props.handleInputChange}
        />
        <button
          style={{
            borderRadius: "8px",
            width: "70px",
            border: "1px solid #76abae",
            backgroundColor: "#76abae",
            color: "#eeeeee",
            fontSize: "1rem",
          }}
          onClick={props.handleSubmit}
        >
          Add
        </button>
      </div>
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
    props.setCustomDisplay(newCustomData);
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
    <section onClick={props.onShow} className="outerSection">
      <div className="innerSectionsCustom">
        <h1>{props.customSectionTitle}</h1>
        <button
          data-custom-section-name={props.customSectionTitle}
          onClick={props.deleteHandler}
          className="customDeleteBtn"
        >
          <img
            src={del}
            alt="trash delete icon"
            style={{ pointerEvents: "none" }}
          />
        </button>
      </div>
      <div className={`container ${props.isActive ? "visible" : "invisible"}`}>
        {props.customSection.customSectionData.map((customData) => (
          <React.Fragment key={customData.id}>
            <CustomSectionFormEdit
              formData={customData}
              key={customData.id}
              inputChangeHandler={editInputFormHandler}
              submitHandler={addFormData}
              submitSave={props.editSubmitHandler}
              enterHandler={preventEnters}
              cancelHandler={cancelForm}
              isActiveEdit={formActive === customData.id}
              index={customData.id}
              deleteHandler={deleteInnerSections}
            ></CustomSectionFormEdit>
            <div
              className={`${props.index === 1 ? "innerSections1" : "innerSections"} ${props.isActive && formActive === customData.id ? "invisible" : "visible"} ${props.isActive === false && "collapse"}`}
              key={crypto.randomUUID()}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>
                  {customData.heading} •{" "}
                </span>
                {customData.subHeading}
              </p>
              <button
                onClick={() => setFormActive(customData.id)}
                className="editBtn"
              >
                <img src={edit} alt="Edit" />
              </button>
            </div>
          </React.Fragment>
        ))}
        <div
          className={`innerSections ${props.isActive && formActive === 0 ? "invisible" : "visible"}`}
        >
          <p>Add Item</p>
          <button onClick={() => setFormActive(0)} className="addBtn">
            <img src={add} alt="Pencil logo add button" />
          </button>
        </div>
        <CustomSectionFormAdd
          formData={initialFormData}
          inputChangeHandler={inputFormHandler}
          submitHandler={addFormData}
          submitSave={props.editSubmitHandler}
          enterHandler={preventEnters}
          cancelHandler={cancelForm}
          index={props.customSection.id}
          isActive={props.isActive && formActive === 0}
        ></CustomSectionFormAdd>
      </div>
    </section>
  );
}

export { CvInput };
