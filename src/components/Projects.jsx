import { useState } from "react";
import PropTypes from "prop-types";
import "./Components.css";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import { mdiDeleteOutline } from "@mdi/js";

function Projects({ onSave }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    name: "",
    link: "",
    descriptions: [],
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    setCurrentProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateForm = () => {
    setShowForm(true);
    setEditIndex(-1);
    setCurrentProject({
      name: "",
      link: "",
      descriptions: [],
    });
  };

  const handleEdit = (index) => {
    setShowForm(true);
    setEditIndex(index);
    setCurrentProject(projects[index]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...currentProject.descriptions];
    newDescriptions[index] = value;
    setCurrentProject({ ...currentProject, descriptions: newDescriptions });
  };

  const addDescription = () => {
    setCurrentProject({
      ...currentProject,
      descriptions: [...currentProject.descriptions, ""],
    });
  };

  const removeDescription = (index) => {
    const newDescriptions = currentProject.descriptions.filter(
      (_, i) => i !== index
    );
    setCurrentProject({ ...currentProject, descriptions: newDescriptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Adding new project
      setProjects([...projects, currentProject]);
    } else {
      // Updating existing project
      const updatedProjects = projects.map((project, index) =>
        index === editIndex ? currentProject : project
      );
      setProjects(updatedProjects);
    }
    setCurrentProject({
      name: "",
      link: "",
      descriptions: [],
    });
    setShowForm(false);
    setEditIndex(-1);
    onSave(editIndex === -1 ? [...projects, currentProject] : projects);
  };

  return (
    <div className="resumeSection" id="projectsDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="projectsTitle">
          Projects
        </h2>
      </button>
      {isVisible && (
        <div className={`projectsContainer ${isVisible ? "visible" : ""}`}>
          {projects.map((project, i) => (
            <div key={i} onClick={() => handleEdit(i)} className="projectEntry">
              <h3>{project.name}</h3>
            </div>
          ))}
          <div className="formsContainer">
            {showForm ? (
              <form
                className="sectionForm"
                id="projectsForm"
                onSubmit={handleSubmit}
              >
                <label>Project Title</label>
                <input
                  type="text"
                  name="name"
                  value={currentProject.name}
                  onChange={handleChange}
                  placeholder="Weather App"
                  required
                />
                <label>Project Link</label>
                <input
                  type="text"
                  name="link"
                  value={currentProject.link}
                  onChange={handleChange}
                  placeholder="github.com/projectlink"
                />
                <div className="descriptionDiv">
                  <label>Project Description</label>
                  <button
                    type="button"
                    className="addDescBtn"
                    onClick={addDescription}
                  >
                    <Icon path={mdiPlusBoxOutline} size={1} />
                  </button>
                </div>
                {currentProject.descriptions.map((desc, index) => (
                  <div key={index}>
                    <div className="descriptionDiv">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        placeholder={`Description ${index + 1}`}
                      />
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
                  {editIndex === -1 ? "Add Project" : "Update Project"}
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

Projects.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Projects;
