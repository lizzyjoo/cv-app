import PropTypes from "prop-types";
import DownloadPDF from "./DownloadPDF";
import "./CV.css";
import "katex/dist/katex.min.css";

// Dummy data
const dummyData = {
  personalInfo: {
    firstName: "Lizzy",
    lastName: "Joo",
    email: "lizzyjoo@bu.edu",
    phone: "123-456-7890",
    website: "www.johndoe.com",
    github: "https://github.com/lizzyjoo",
    linkedin: "linkedin.com/in/lizzyjoo",
  },
  educations: [
    {
      school: "Boston University",
      city: "Boston, MA",
      degree: "PhD",
      major: "Neurobiology; Computational Neuroscience focus",
      dateAttended: "Sep. 2024 – Present",
    },
    {
      school: "Brandeis University",
      city: "Waltham, MA",
      degree: "B.S.",
      major: "Neuroscience",
      dateAttended: "Aug. 2018 - May 2022",
    },
  ],
  employments: [
    {
      name: "MIT",
      position: "Technical Associate",
      location: "Cambridge, MA",
      date: "July 2022 – March 2024",
      descriptions: [
        "Conducted genome editing experiments in a Rett Syndrome mouse model and identified enhancer candidates that affect the expression of oligodendrocyte precursor cell expressio",
        "Performed data cleaning and preprocessing using Python for experimental data analysis",
      ],
    },
    {
      name: "Harvard T.H. Chan School of Public Health",
      position: "Research Assistant",
      location: "Boston, MA",
      date: "May 2021 – January 2022",
      descriptions: [
        "Performed COVID-19 quantitative serological evaluations and antibody testing using ELISA in collaboration with Octapharma to develop a real-time surveillance network for infectious diseases and optimize plasma sample processing time.",
      ],
    },
    {
      name: "Brandeis University",
      position: "Undergraduate Research Assistant",
      location: "Waltham, MA",
      date: "Mar 2019 – May 2022",
      descriptions: [
        "Conducted ex vivo electrophysiology experiments and behavioral assays using a Drosophila melanogaster associative learning circuit model to investigate dopaminergic neurons",
      ],
    },
  ],
  projects: [
    {
      name: "HIREsuME",
      link: "www.myportfolio.com",
      descriptions: [
        "Developed a CV Builder application using React, enabling LaTeX-like-format resume generation based on user-inputted personal information",
      ],
    },
    {
      name: "Weather App",
      link: "https://github.com/lizzyjoo/weather-app",
      descriptions: [
        "Developed a responsive Weather App utilizing Visual Crossing Weather API and Google Places Autocomplete API to provide real-time weather data and forecasts with location search functionality",
      ],
    },
    {
      name: "Battleship",
      link: "https://github.com/lizzyjoo/battleship",
      descriptions: [
        "Developed a fully interactive Battleship game applying object-oriented programming and Test Driven Development with Jest, featuring a responsive UI with CSS animations and the ability to play against the computer",
      ],
    },
    {
      name: "FR-Perturb",
      link: "https://github.com/lizzyjoo",
      descriptions: [
        "Learned to use Docker for running FR-Perturb, a Python tool for analyzing RNA-seq data from Perturb-seq experiments, and reproduced results by applying the factorize-recover algorithm to estimate gene expression effects",
      ],
    },
  ],
  experience: [
    {
      name: "Brandeis University",
      position: "Head Teaching Assistant",
      date: "August 2021 – May 2022",
      descriptions: [
        "Supervised a group of 10 TAs and facilitated grading process for over 100 students in the Problem Solving in Python course",
        "Led weekly recitation sessions by creating lecture materials and designed an automated Google Sheet for grading",
      ],
    },
    {
      name: "Brandeis University",
      position: "Python Peer Tutor",
      date: "August 2021 – May 2022",
      descriptions: [
        "Designed and implemented Python Programming learning modules for first-generation college students",
      ],
    },
  ],
  skills: [
    {
      name: "Languages",
      skills: ["JavaScript", "Python", "Java", "HTML/CSS", "R"],
    },
    {
      name: "Developer Tools",
      skills: ["Docker", "Git", "Eclipse", "VS Code"],
    },
  ],
};

function CVdisplay({
  personalInfo,
  educations,
  employments,
  projects,
  experience,
  skills,
}) {
  const hasPersonalInfo =
    personalInfo && Object.values(personalInfo).some((value) => value);
  const hasEducations = educations && educations.length > 0;
  const hasEmployments = employments && employments.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasSkills = skills && skills.length > 0;

  const displayPersonalInfo = hasPersonalInfo
    ? personalInfo
    : dummyData.personalInfo;
  const displayEducations = hasEducations ? educations : dummyData.educations;
  const displayEmployments = hasEmployments
    ? employments
    : dummyData.employments;
  const displayProjects = hasProjects ? projects : dummyData.projects;
  const displayExperience = hasExperience ? experience : dummyData.experience;
  const displaySkills = hasSkills ? skills : dummyData.skills;

  return (
    <div className="resume">
      <div className="downloadBtnDiv">
        <DownloadPDF rootElementId="cv-content" downloadFileName="my_cv.pdf" />
      </div>

      <div id="cv-content">
        <header id="resumeHeader" style={{ textAlign: "center" }}>
          <h1 className="resumeName">{`${displayPersonalInfo.firstName} ${displayPersonalInfo.lastName}`}</h1>
          <p>
            {displayPersonalInfo.email} | {displayPersonalInfo.phone} |{" "}
            <a href="url">{displayPersonalInfo.github}</a> |{" "}
            <a href="url">{displayPersonalInfo.linkedin}</a>
          </p>
        </header>

        <section className="education">
          <p className="resumeSectionTitle">EDUCATION</p>
          <hr />
          {displayEducations.map((edu, eduIndex) => (
            <div key={eduIndex} className="resumeItem" id="educationItem">
              <div className="eduLeft">
                <p className="boldSection">{edu.school}</p>
                <p className="obliqueSection">
                  {edu.degree} in {edu.major}
                  {edu.gpa && <span> GPA: {edu.gpa}</span>}
                </p>
              </div>
              <div className="eduRight">
                <p>{edu.city}</p>
                <p className="obliqueSection">{edu.dateAttended}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="projects">
          <p className="resumeSectionTitle">PROJECTS</p>
          <hr />
          <ul className="resume-list">
            {displayProjects.map((proj, projIndex) => (
              <li key={projIndex}>
                <div key={projIndex} className="resumeItem" id="projectItem">
                  <div className="projectHeading">
                    <span className="boldSection">
                      {proj.name} |{" "}
                      <span className="obliqueSection">{proj.link}</span>
                    </span>
                  </div>
                  <div className="descriptionDiv">
                    <ul className="descList">
                      {proj.descriptions.map((desc, descIndex) => (
                        <li key={descIndex} className="descItem">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="experience">
          <p className="resumeSectionTitle">RELEVANT EXPERIENCE</p>
          <hr />
          <ul className="resume-list">
            {displayExperience.map((exp, expIndex) => (
              <li key={expIndex}>
                <div key={expIndex} className="resumeItem" id="experienceItem">
                  <div className="experienceHeading">
                    <div className="experienceLeft">
                      <span className="boldSection">
                        {exp.position} |{" "}
                        <span className="obliqueSection">{exp.name}</span>
                      </span>
                    </div>
                    <div className="experienceRight">
                      <span>{exp.date}</span>
                    </div>
                  </div>
                  <div className="descriptionDiv">
                    <ul className="descList">
                      {exp.descriptions.map((desc, descIndex) => (
                        <li key={descIndex} className="descItem">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="employment">
          <p className="resumeSectionTitle">WORK EXPERIENCE</p>
          <hr />
          <ul className="resume-list">
            {displayEmployments.map((job, jobIndex) => (
              <li key={jobIndex}>
                <div key={jobIndex} className="resumeItem" id="employmentItem">
                  <div className="employmentHeading">
                    <div className="employmentLeft">
                      <span className="boldSection">{job.position}</span>
                      <span className="obliqueSection">{job.name}</span>
                    </div>
                    <div className="employmentRight">
                      <span>{job.date}</span>
                      <span className="obliqueSection">{job.location}</span>
                    </div>
                  </div>
                  <div className="descriptionDiv">
                    <ul className="descList">
                      {job.descriptions.map((desc, descIndex) => (
                        <li key={descIndex} className="descItem">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="skills">
          <p className="resumeSectionTitle">TECHNICAL SKILLS</p>
          <hr />
          <ul className="resume-list">
            {displaySkills.map((category, catIndex) => (
              <li key={catIndex} className="skillsItem">
                <span className="boldSection">{category.name}:</span>{" "}
                {category.skills.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

CVdisplay.propTypes = {
  personalInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
  }),
  educations: PropTypes.arrayOf(
    PropTypes.shape({
      school: PropTypes.string,
      city: PropTypes.string,
      degree: PropTypes.string,
      major: PropTypes.string,
      dateAttended: PropTypes.string,
      gpa: PropTypes.string,
    })
  ),
  employments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      location: PropTypes.string,
      date: PropTypes.string,
      descriptions: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      descriptions: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      date: PropTypes.string,
      descriptions: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default CVdisplay;
