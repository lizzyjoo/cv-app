import { useState } from "react";
import "./Components.css";
import PropTypes from "prop-types";

function PersonalInfo({ onSave }) {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    website: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(info);
  };

  return (
    <div className="resumeSection" id="personalInfoDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="personalInfoTitle">
          Personal Info
        </h2>
      </button>
      {isVisible && (
        <div className={`personalInfoContainer ${isVisible ? "visible" : ""}`}>
          <form
            className="sectionForm"
            id="personalInfoForm"
            onSubmit={handleSubmit}
          >
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={info.firstName}
              onChange={handleChange}
              id="firstName"
              placeholder="First"
              required
            ></input>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={info.lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Last"
              required
            ></input>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              id="phone"
              placeholder="123-456-789"
              required
            ></input>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              id="email"
              placeholder="youremail@email.com"
              required
            ></input>
            <label>Github/Website</label>
            <input
              type="url"
              name="github"
              value={info.github}
              onChange={handleChange}
              id="github"
              placeholder="github"
              required
            ></input>
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={info.linkedin}
              onChange={handleChange}
              id="linkedin"
              placeholder="LinkedIn"
              required
            ></input>

            <button className="formSubmitBtn" type="submit">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

PersonalInfo.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default PersonalInfo;
