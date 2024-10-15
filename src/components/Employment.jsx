import { useState } from "react";
import PropTypes from "prop-types";
import "./Components.css";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import { mdiDeleteOutline } from "@mdi/js";

function Employment({ onSave }) {
  const [employments, setEmployments] = useState([]);
  const [currentEmployment, setCurrentEmployment] = useState({
    name: "",
    position: "",
    location: "",
    date: "",
    descriptions: [],
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    setCurrentEmployment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateForm = () => {
    setShowForm(true);
    setEditIndex(-1);
    setCurrentEmployment({
      name: "",
      position: "",
      location: "",
      date: "",
      descriptions: [],
    });
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setEditIndex(index);
    setCurrentEmployment(employments[index]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...currentEmployment.descriptions];
    newDescriptions[index] = value;
    setCurrentEmployment({
      ...currentEmployment,
      descriptions: newDescriptions,
    });
  };

  const addDescription = () => {
    setCurrentEmployment({
      ...currentEmployment,
      descriptions: [...currentEmployment.descriptions, ""],
    });
  };

  const removeDescription = (index) => {
    const newDescriptions = currentEmployment.descriptions.filter(
      (_, i) => i !== index
    );
    setCurrentEmployment({
      ...currentEmployment,
      descriptions: newDescriptions,
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    let updatedEmployments;
    if (editIndex === -1) {
      updatedEmployments = [...employments, currentEmployment];
    } else {
      updatedEmployments = employments.map((job, index) =>
        index === editIndex ? currentEmployment : job
      );
    }
    setEmployments(updatedEmployments);

    setCurrentEmployment({
      name: "",
      position: "",
      location: "",
      date: "",
      descriptions: [],
    });
    setShowForm(false);
    setEditIndex(-1);
    onSave(updatedEmployments);
  };

  return (
    <div className="resumeSection" id="employmentDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="employmentTitle">
          Employment
        </h2>
      </button>
      {isVisible && (
        <div className={`employmentContainer ${isVisible ? "visible" : ""}`}>
          {employments.map((job, i) => (
            <div
              key={i}
              onClick={() => handleEdit(i)}
              className="employmentEntry"
            >
              <p>{job.name}</p>
              <p>{job.position}</p>
              <ul>
                {job.descriptions.map((desc, j) => (
                  <li key={j}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="formsContainer">
            {showForm ? (
              <form
                className="sectionForm"
                id="employmentForm"
                onSubmit={handleAdd}
              >
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentEmployment.name}
                  onChange={handleChange}
                  placeholder="Company Inc."
                />
                <label>Position Title</label>
                <input
                  type="text"
                  name="position"
                  value={currentEmployment.position}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                />
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={currentEmployment.location}
                  onChange={handleChange}
                  placeholder="Boston, MA"
                />
                <label>Employment Date</label>
                <input
                  type="text"
                  name="date"
                  value={currentEmployment.date}
                  onChange={handleChange}
                  placeholder="Jan 2022 — Aug 2024"
                />
                <div className="descriptionDiv">
                  <label>Job Description</label>
                  <button
                    type="button"
                    className="addDescBtn"
                    onClick={addDescription}
                  >
                    <Icon path={mdiPlusBoxOutline} size={1} />
                  </button>
                </div>
                {currentEmployment.descriptions.map((desc, index) => (
                  <div key={index}>
                    <div className="descriptionDiv">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        placeholder={`Description ${index + 1}`}
                      ></input>
                      <button
                        type="button"
                        className="removeBtn"
                        onClick={() => removeDescription(index)}
                      >
                        <Icon path={mdiDeleteOutline} size={1} />
                      </button>
                    </div>
                  </div>
                ))}

                <button className="formSubmitBtn" type="submit">
                  {editIndex === -1 ? "Add Employment" : "Update Employment"}
                </button>
              </form>
            ) : (
              <button className="createForm" onClick={handleCreateForm}>
                Add
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Employment.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Employment;
