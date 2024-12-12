export function PersonalInformationCvOutput(props) {
  return (
    <div>
      <h1>{props.personalInfo.name}</h1>
      <ul>
        <li>{props.personalInfo.number}</li>
        <li>{props.personalInfo.email}</li>
        <li>{props.personalInfo.socialMedia}</li>
      </ul>
    </div>
  );
}

export function PersonalInformation({
  isActive,
  onShow,
  personalInfo,
  handleInputChange,
}) {
  return (
    <section onClick={onShow} className="outerSection">
      <h1>Personal Information</h1>
      {isActive && (
        <div className="personalDiv">
          <form className="personalForm">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={personalInfo.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="number">Mobile No.</label>
              <input
                type="text"
                name="number"
                id="number"
                value={personalInfo.number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="socialMedia">Social Media</label>
              <input
                type="text"
                name="socialMedia"
                id="socialMedia"
                value={personalInfo.socialMedia}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
