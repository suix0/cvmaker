import { useState } from "react";
import React from "react";
import { PersonalInformation, PersonalInformationCvOutput } from "./Personal";
import { EducationInformation, EducationCvDisplay } from "./Education";
import { ExperienceInformation } from "./Experience";
import { ProjectsInformation } from "./Projects";
import { CustomSectionForm } from "./forms/CustomSectionForm";
import educationData from "../data/educationData";

let nextActiveIndex = 4;
function CvInput() {
  // CV Information States
  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    number: "09213210982",
    email: "johndoe@gmail.com",
    socialMedia: "https://github.com/johndoe",
  });
  const [customSectionTitle, setTitle] = useState("");

  // Educaton Information state
  const [initialEducationData, setEducationData] = useState(educationData);
  const [educationCvDisplay, setEducationDisplay] = useState(educationData);
  const [activeEditEducation, setActiveEditEducation] = useState(null);

  // Accordion logic in CV form sections
  const [activeIndex, setActive] = useState(0);
  const [customSections, setCustomSections] = useState([]);

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
      setCustomSections([
        ...customSections,
        { title: customSectionTitle, id: nextActiveIndex },
      ]);
      nextActiveIndex++;
      setTitle("");
    }
  }

  function deleteCustomSection(e) {
    e.preventDefault();
    const newCustomData = customSections.filter(
      (custom) => custom.title !== e.target.dataset.customSectionName,
    );
    setCustomSections(newCustomData);
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
          ></ExperienceInformation>
          <ProjectsInformation
            isActive={activeIndex === 3}
            onShow={() => setActive(3)}
          ></ProjectsInformation>
          {customSections.map((custom) => (
            <CustomSectionInformation
              customSectionTitle={custom.title}
              deleteHandler={deleteCustomSection}
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
  const [customSectionData, setCustomSectionData] = useState([]);
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

  function addFormData(e) {
    e.preventDefault();
    setCustomSectionData([...customSectionData, initialFormData]);
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
    const newCustomData = customSectionData.filter(
      (customData) => customData.id !== parseInt(e.target.dataset.index),
    );
    setCustomSectionData(newCustomData);
  }

  function preventEnters(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function cancelForm(e) {
    e.preventDefault();
    setFormActive(false);
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
          {customSectionData.map((customSection) => (
            <React.Fragment key={customSection.id}>
              {formActive === customSection.id ? (
                <CustomSectionForm
                  formData={customSection}
                  key={customSection.id}
                  inputChangeHandler={inputFormHandler}
                  submitHandler={addFormData}
                  enterHandler={preventEnters}
                  cancelFormHandler={() => setFormActive(null)}
                  isActive={formActive === customSection.id}
                  index={customSection.id}
                  deleteHandler={deleteInnerSections}
                ></CustomSectionForm>
              ) : (
                <div className="innerSections" key={customSection.id}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      {customSection.heading} •{" "}
                    </span>
                    {customSection.subHeading}
                  </p>
                  <button onClick={() => setFormActive(customSection.id)}>
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
          cancelEditHandler={() => setFormActive(null)}
        ></CustomSectionForm>
      )}
    </section>
  );
}

export { CvInput };
