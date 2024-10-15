import { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Employment from "./components/Employment";
import Projects from "./components/Projects";
import RelevantExp from "./components/RelevantExp";
import Skills from "./components/Skills";
import CVdisplay from "./components/CVdisplay";
import "./App.css";

function App() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [educations, setEducations] = useState([]);
  const [employments, setEmployments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [relevantExp, setRelevantExp] = useState([]);
  const [skills, setSkills] = useState([]);

  return (
    <div className="App">
      <header className="pageHeader">HIREsuME</header>
      <div className="container">
        <div className="editSection">
          <>
            <PersonalInfo onSave={setPersonalInfo}></PersonalInfo>
            <Education onSave={setEducations}></Education>
            <Projects onSave={setProjects}></Projects>
            <RelevantExp onSave={setRelevantExp}></RelevantExp>
            <Employment onSave={setEmployments}></Employment>
            <Skills onSave={setSkills}></Skills>
          </>
        </div>
        <div className="previewSection">
          <>
            <CVdisplay
              personalInfo={personalInfo}
              educations={educations}
              employments={employments}
              projects={projects}
              experience={relevantExp}
              skills={skills}
            />
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
