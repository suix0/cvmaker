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
        />
      </div>
      {props.isActive ? (
        <div className="innerSections">
          <button>Delete</button>
          <div>
            <button onClick={props.cancelFormHandler}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      ) : (
        <>
          <button onClick={props.cancelFormHandler}>Cancel</button>
          <button onClick={props.submitHandler}>Add</button>
        </>
      )}
    </form>
  );
}

export { CustomSectionForm };
