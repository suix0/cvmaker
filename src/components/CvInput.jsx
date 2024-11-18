import { useState } from "react";
import PersonalInformation from "./PersonalSection";
import { EducationInformation } from "./EducationSection";
import { ExperienceInformation } from "./ExperienceSection";
import { ProjectsInformation } from "./Projects";

function CvInput() {
  const [activeIndex, setActive] = useState(0);

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
      </div>
    </div>
  );
}

export { CvInput };
