import { useState } from "react";
import PropTypes from "prop-types";
import "./Components.css";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import { mdiDeleteOutline } from "@mdi/js";

function RelevantExp({ onSave }) {
  const [relevantExp, setRelevantExp] = useState([]);
  const [currentRelevantExp, setCurrentRelevantExp] = useState({
    name: "",
    position: "",
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
    setCurrentRelevantExp((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateForm = () => {
    setShowForm(true);
    setEditIndex(-1);
    setCurrentRelevantExp({
      name: "",
      position: "",
      date: "",
      descriptions: [],
    });
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setEditIndex(index);
    setCurrentRelevantExp(relevantExp[index]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...currentRelevantExp.descriptions];
    newDescriptions[index] = value;
    setCurrentRelevantExp({
      ...currentRelevantExp,
      descriptions: newDescriptions,
    });
  };

  const addDescription = () => {
    setCurrentRelevantExp({
      ...currentRelevantExp,
      descriptions: [...currentRelevantExp.descriptions, ""],
    });
  };

  const removeDescription = (index) => {
    const newDescriptions = currentRelevantExp.descriptions.filter(
      (_, i) => i !== index
    );
    setCurrentRelevantExp({
      ...currentRelevantExp,
      descriptions: newDescriptions,
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    let updatedRelevantExp;
    if (editIndex === -1) {
      updatedRelevantExp = [...relevantExp, currentRelevantExp];
    } else {
      updatedRelevantExp = relevantExp.map((exp, index) =>
        index === editIndex ? currentRelevantExp : exp
      );
    }
    setRelevantExp(updatedRelevantExp);

    setCurrentRelevantExp({
      name: "",
      position: "",
      date: "",
      descriptions: [],
    });
    setShowForm(false);
    setEditIndex(-1);
    onSave(updatedRelevantExp);
  };

  return (
    <div className="resumeSection" id="relevantExperienceDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="relevantExperienceTitle">
          Relevant Experience
        </h2>
      </button>
      {isVisible && (
        <div
          className={`relevantExperienceContainer ${
            isVisible ? "visible" : ""
          }`}
        >
          {relevantExp.map((exp, i) => (
            <div
              key={i}
              onClick={() => handleEdit(i)}
              className="relevantExperienceEntry"
            >
              <p>{exp.name}</p>
              <p>{exp.position}</p>
              <ul>
                {exp.descriptions.map((desc, j) => (
                  <li key={j}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="formsContainer">
            {showForm ? (
              <form
                className="sectionForm"
                id="relevantExperienceForm"
                onSubmit={handleAdd}
              >
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentRelevantExp.name}
                  onChange={handleChange}
                  placeholder="LJ Company"
                />
                <label>Position Title</label>
                <input
                  type="text"
                  name="position"
                  value={currentRelevantExp.position}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                />

                <label>Experience Date</label>
                <input
                  type="text"
                  name="date"
                  value={currentRelevantExp.date}
                  onChange={handleChange}
                  placeholder="Jan 2022 — Aug 2024"
                />
                <div className="descriptionDiv">
                  <label>Experience Description</label>
                  <button
                    type="button"
                    className="addDescBtn"
                    onClick={addDescription}
                  >
                    <Icon path={mdiPlusBoxOutline} size={1} />
                  </button>
                </div>
                {currentRelevantExp.descriptions.map((desc, index) => (
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
                  {editIndex === -1 ? "Add Experience" : "Update Experience"}
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

RelevantExp.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default RelevantExp;
