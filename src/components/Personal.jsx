import { useState } from "react";

export default function PersonalInformation({ isActive, onShow }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    number: "09213210982",
    email: "johndoe@gmail.com",
    socialMedia: "https://github.com/johndoe",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  }

  return (
    <section onClick={onShow}>
      <h1>Personal Information</h1>
      {isActive && (
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={personalInfo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="number">Mobile No.</label>
            <input
              type="text"
              name="number"
              id="number"
              value={personalInfo.number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={personalInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="socialMedia">Social Media</label>
            <input
              type="text"
              name="socialMedia"
              id="socialMedia"
              value={personalInfo.socialMedia}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
    </section>
  );
}
