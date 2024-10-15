import { useState } from "react";
import PropTypes from "prop-types";
import "./Components.css";

function Education({ onSave }) {
  const [educations, setEducations] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    city: "",
    degree: "",
    dateAttended: "",
    major: "",
    gpa: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateForm = () => {
    setShowForm(true);
    setEditIndex(-1);
    setCurrentEducation({
      school: "",
      city: "",
      degree: "",
      dateAttended: "",
      major: "",
      gpa: "",
    });
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setEditIndex(index);
    setCurrentEducation(educations[index]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let updatedEducations;
    if (editIndex === -1) {
      // Adding new education
      updatedEducations = [...educations, currentEducation];
    } else {
      // Updating existing education
      updatedEducations = educations.map((edu, index) =>
        index === editIndex ? currentEducation : edu
      );
    }
    setEducations(updatedEducations);
    setCurrentEducation({
      school: "",
      city: "",
      degree: "",
      dateAttended: "",
      major: "",
      gpa: "",
    });
    setShowForm(false);
    setEditIndex(-1);
    onSave(updatedEducations);
  };

  return (
    <div className="resumeSection" id="educationDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="educationTitle">
          Education
        </h2>
      </button>
      {isVisible && (
        <div className={`educationContainer ${isVisible ? "visible" : ""}`}>
          {educations.map((education, i) => (
            <div
              key={i}
              onClick={() => handleEdit(i)}
              className="educationEntry"
            >
              <p>
                {education.school} - {education.degree}
              </p>
            </div>
          ))}
          <div className="formsContainer">
            {showForm ? (
              <form
                className="sectionForm"
                id="educationForm"
                onSubmit={handleAdd}
              >
                <label>School Name</label>
                <input
                  type="text"
                  name="school"
                  value={currentEducation.school}
                  onChange={handleChange}
                  placeholder="Example University"
                  required
                />
                <label>Location</label>
                <input
                  type="text"
                  name="city"
                  value={currentEducation.city}
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />
                <label>Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={currentEducation.degree}
                  onChange={handleChange}
                  placeholder="B.S."
                  required
                />
                <label>Date Attended</label>
                <input
                  type="text"
                  name="dateAttended"
                  value={currentEducation.dateAttended}
                  onChange={handleChange}
                  placeholder="Aug 2018 — May 2022"
                  required
                />
                <label>Major</label>
                <input
                  type="text"
                  name="major"
                  value={currentEducation.major}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  required
                />
                <label>GPA</label>
                <input
                  type="text"
                  name="gpa"
                  value={currentEducation.gpa}
                  onChange={handleChange}
                  placeholder="GPA"
                />
                <button className="formSubmitBtn" type="submit">
                  {editIndex === -1 ? "Add" : "Update"}
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

Education.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Education;
