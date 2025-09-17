import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { renderSections } from "./output.mjs";

// Show course title
document.querySelector("#courseName").textContent = byuiCourse.name;
document.querySelector("#courseCode").textContent = byuiCourse.code;

// Populate select dropdown
setSectionSelection(byuiCourse.sections);

// Render initial sections
renderSections(byuiCourse.sections);

// Hook up enroll button
document.querySelector("#enrollStudent").addEventListener("click", () => {
  const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, true);
  renderSections(byuiCourse.sections);
});

// Hook up drop button
document.querySelector("#dropStudent").addEventListener("click", () => {
  const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});