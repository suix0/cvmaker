function CustomSectionCvDisplay(props) {
  return (
    <>
      {props.customData.map((data) => (
        <div key={crypto.randomUUID()}>
          <h1>{data.title}</h1>
          <hr></hr>
          {data.customSectionData.map((data) => (
            <div key={crypto.randomUUID()}>
              <div>
                <p>{data.heading}</p>
                <p>{data.subHeading}</p>
              </div>
              <div>
                <p>{data.date}</p>
                <p>{data.additionalInfo}</p>
              </div>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

function CustomSectionForm(props) {
  return (
    <form>
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

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={props.formData.description}
          onChange={props.inputChangeHandler}
          onKeyDown={props.enterHandler}
          data-index={props.index}
        ></textarea>
      </div>

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
      {props.isActive ? (
        <div className="innerSections">
          <button data-index={props.index} onClick={props.deleteHandler}>
            Delete
          </button>
          <div>
            <button onClick={props.cancelFormHandler}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      ) : (
        <>
          <button onClick={props.cancelHandler}>Cancel</button>
          <button onClick={props.submitHandler} data-index={props.index}>
            Add
          </button>
        </>
      )}
    </form>
  );
}

export { CustomSectionForm, CustomSectionCvDisplay };
