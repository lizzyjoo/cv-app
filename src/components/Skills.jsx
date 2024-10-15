import { useState } from "react";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import { mdiDeleteOutline } from "@mdi/js";
import { mdiMinusCircleOutline } from "@mdi/js";

function Skills({ onSave }) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (
      currentCategory.trim() !== "" &&
      !categories.some((cat) => cat.name === currentCategory.trim())
    ) {
      const newCategory = { name: currentCategory.trim(), skills: [] };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setCurrentCategory("");
      onSave(updatedCategories);
    }
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (currentSkill.trim() !== "" && selectedCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.name === selectedCategory
          ? { ...cat, skills: [...cat.skills, currentSkill.trim()] }
          : cat
      );
      setCategories(updatedCategories);
      setCurrentSkill("");
      onSave(updatedCategories);
    }
  };

  const handleDeleteCategory = (categoryName) => {
    const updatedCategories = categories.filter(
      (cat) => cat.name !== categoryName
    );
    setCategories(updatedCategories);
    onSave(updatedCategories);
  };

  const handleDeleteSkill = (categoryName, skillIndex) => {
    const updatedCategories = categories.map((cat) =>
      cat.name === categoryName
        ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
        : cat
    );
    setCategories(updatedCategories);
    onSave(updatedCategories);
  };

  return (
    <div className="resumeSection" id="skillsDiv">
      <button
        className={`expandSection ${isVisible ? "expanded" : ""}`}
        onClick={toggleVisibility}
      >
        <h2 className="sectionTitle" id="skillsTitle">
          Skills
        </h2>
      </button>

      {isVisible && (
        <div className={`skillsContainer ${isVisible ? "visible" : ""}`}>
          <form
            className="sectionForm"
            id="categoriesForm"
            onSubmit={handleCategorySubmit}
          >
            <div className="categoryAddDiv">
              <label>Category</label>
              <div className="addCategoryDiv">
                <input
                  type="text"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  placeholder="Languages"
                  id="skillCatInputField"
                />
                <button className="addCategoryBtn" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="categoryEntry">
                {category.name}
                <button
                  id="categoryRemoveBtn"
                  className="removeBtn"
                  onClick={() => handleDeleteCategory(category.name)}
                >
                  <Icon path={mdiDeleteOutline} size={1} />
                </button>
              </h3>

              <ul>
                {category.skills.map((skill, i) => (
                  <li className="skill" key={i}>
                    {skill}
                    <button
                      className="removeBtn"
                      id="skillRemoveBtn"
                      onClick={() => handleDeleteSkill(category.name, i)}
                    >
                      <Icon path={mdiMinusCircleOutline} size={0.8} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <form
            className="sectionForm"
            id="skillsForm"
            onSubmit={handleSkillSubmit}
          >
            <label>Add Skill</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="skillsAddDiv">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="New Skill (e.g., Python)"
                required
              />
              <button type="submit" id="plusBtn">
                <Icon path={mdiPlusBoxOutline} size={1.3} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

Skills.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Skills;
