import { useState } from "react";
import React from "react";
import PersonalInformation from "./Personal";
import { EducationInformation } from "./Education";
import { ExperienceInformation } from "./Experience";
import { ProjectsInformation } from "./Projects";
import customSections from "../data/customDataTitle";
import { CustomSectionForm } from "./customForm/CustomSectionForm";

let nextActiveIndex = 4;

function CvInput() {
  const [activeIndex, setActive] = useState(0);
  const [customSectionTitle, setTitle] = useState("");

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (customSectionTitle !== "") {
      customSections.push({ title: customSectionTitle, id: nextActiveIndex });
      nextActiveIndex++;
      console.log(customSections);
      setTitle("");
    }
  }

  return (
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
        ></PersonalInformation>
        <EducationInformation
          isActive={activeIndex === 1}
          onShow={() => setActive(1)}
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
      <h1>{props.customSectionTitle}</h1>
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
