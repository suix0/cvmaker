function CustomSectionCvDisplay(props) {
  return (
    <>
      {props.customData.map((data) => (
        <div key={crypto.randomUUID()}>
          <h1>{data.title}</h1>
          <hr></hr>
          <div className="cvCustomDisplayContainer">
            {data.customSectionData.map((data) => (
              <div key={crypto.randomUUID()} className="cvCustomDisplay">
                <div className="top">
                  <div className="left">
                    <p style={{ fontWeight: "bolder" }}>{data.heading}</p>
                    <p style={{ color: "rgb(76 5 25)" }}>{data.subHeading}</p>
                  </div>
                  <div className="right">
                    <p style={{ color: "rgb(76 5 25)" }}>{data.date}</p>
                    <p
                      style={{
                        color: "rgb(76 5 25)",
                        fontStyle: "italic",
                      }}
                    >
                      {data.additionalInfo}
                    </p>
                  </div>
                </div>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function CustomSectionFormEdit(props) {
  return (
    <form className={`forms ${props.isActiveEdit ? "visible" : "invisible"}`}>
      <div className="formContainer">
        <div>
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={props.formData.heading}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>

        <div>
          <label htmlFor="subHeading">Sub Heading</label>
          <input
            type="text"
            id="subHeading"
            name="subHeading"
            value={props.formData.subHeading}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={props.formData.description}
          onChange={props.inputChangeHandler}
          onKeyDown={props.enterHandler}
          data-index={props.index}
          style={{ width: "100%" }}
        ></textarea>
      </div>

      <div className="formContainer">
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={props.formData.date}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>

        <div>
          <label htmlFor="additionalInfo">Additional Information</label>
          <input
            type="text"
            name="additionalInfo"
            id="additionalInfo"
            value={props.formData.additionalInfo}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>
      </div>
      {props.isActiveEdit ? (
        <div className="buttonsEdit">
          <button data-index={props.index} onClick={props.deleteHandler}>
            Delete
          </button>
          <p>
            <button onClick={props.cancelHandler}>Cancel</button>
            <button onClick={props.submitHandler}>Save</button>
          </p>
        </div>
      ) : (
        props.isActive && (
          <div className="addBtnContainer">
            <button onClick={props.cancelHandler}>Cancel</button>
            <button onClick={props.submitHandler} data-index={props.index}>
              Add
            </button>
          </div>
        )
      )}
    </form>
  );
}

function CustomSectionFormAdd(props) {
  return (
    <form className={`forms ${props.isActive ? "visible" : "invisible"}`}>
      <div className="formContainer">
        <div>
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={props.formData.heading}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>

        <div>
          <label htmlFor="subHeading">Sub Heading</label>
          <input
            type="text"
            id="subHeading"
            name="subHeading"
            value={props.formData.subHeading}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={props.formData.description}
          onChange={props.inputChangeHandler}
          onKeyDown={props.enterHandler}
          data-index={props.index}
          style={{ width: "100%" }}
        ></textarea>
      </div>

      <div className="formContainer">
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={props.formData.date}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>

        <div>
          <label htmlFor="additionalInfo">Additional Information</label>
          <input
            type="text"
            name="additionalInfo"
            id="additionalInfo"
            value={props.formData.additionalInfo}
            onChange={props.inputChangeHandler}
            onKeyDown={props.enterHandler}
            data-index={props.index}
          />
        </div>
      </div>
      {props.isActiveEdit ? (
        <div className="buttonsEdit">
          <button data-index={props.index} onClick={props.deleteHandler}>
            Delete
          </button>
          <p>
            <button onClick={props.cancelHandler}>Cancel</button>
            <button onClick={props.submitHandler}>Save</button>
          </p>
        </div>
      ) : (
        props.isActive && (
          <div className="addBtnContainer">
            <button onClick={props.cancelHandler}>Cancel</button>
            <button onClick={props.submitHandler} data-index={props.index}>
              Add
            </button>
          </div>
        )
      )}
    </form>
  );
}

export { CustomSectionFormEdit, CustomSectionFormAdd, CustomSectionCvDisplay };
