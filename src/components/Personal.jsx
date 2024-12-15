export function PersonalInformationCvOutput(props) {
  return (
    <div className="personal">
      <p style={{ fontSize: "2.2rem" }}>{props.personalInfo.name}</p>
      <ul>
        <li style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: "14px" }}
          >
            <title>email</title>
            <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
          </svg>
          {props.personalInfo.email}
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: "14px" }}
          >
            <title>phone</title>
            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
          </svg>
          {props.personalInfo.number}
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {props.socialMedia === 0 && (
            <img
              style={{ pointerEvents: "none", width: "14px" }}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg"
              className="socialMediaBtnDisplay"
            />
          )}
          {props.socialMedia === 1 && (
            <img
              style={{ pointerEvents: "none", width: "14px" }}
              className="socialMediaBtnDisplay"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
            />
          )}
          {props.socialMedia === 2 && (
            <img
              style={{ pointerEvents: "none", width: "14px" }}
              className="socialMediaBtnDisplay"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
            />
          )}
          {props.personalInfo.socialMedia}
        </li>
      </ul>
    </div>
  );
}

export function PersonalInformation({
  isActive,
  onShow,
  personalInfo,
  handleInputChange,
  socialMediaHandler,
  socialMediaVal,
}) {
  return (
    <section onClick={onShow} className="outerSection">
      <h1>Personal Information</h1>
      <div className={`personalDiv ${isActive ? "visible" : "invisible"}`}>
        <form className={`personalForm ${isActive ? "visible" : "invisible"}`}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgb(255, 255, 255)",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              className="socialMediaBtns"
            >
              <button
                className="socialMediaBtn"
                style={{
                  borderRadius: "10px 0 0 10px",
                  backgroundColor:
                    socialMediaVal === 0 ? "#c0c0c0" : "oklch(0.961151 0 0)",
                }}
                id="0"
                onClick={socialMediaHandler}
              >
                <img
                  style={{ pointerEvents: "none" }}
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg"
                />
              </button>

              <button
                className="socialMediaBtn"
                style={{
                  backgroundColor:
                    socialMediaVal === 1 ? "#c0c0c0" : "oklch(0.961151 0 0)",
                }}
                id="1"
                onClick={socialMediaHandler}
              >
                <img
                  style={{ pointerEvents: "none" }}
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                />
              </button>

              <button
                className="socialMediaBtn"
                style={{
                  backgroundColor:
                    socialMediaVal === 2 ? "#c0c0c0" : "oklch(0.961151 0 0)",
                }}
                id="2"
                onClick={socialMediaHandler}
              >
                <img
                  style={{ pointerEvents: "none" }}
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                />
              </button>
              <input
                type="text"
                name="socialMedia"
                id="socialMedia"
                value={personalInfo.socialMedia}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
