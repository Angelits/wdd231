export function setTitle(course) {
  const title = document.querySelector("#courseName");
  title.textContent = course.name;
}

export function renderSections(sections) {
  console.log("Rendering sections:", sections);
  const output = document.querySelector("#sections");
  output.innerHTML = "";

  sections.forEach(sec => {
    const div = document.createElement("div");
    div.textContent = `Section ${sec.sectionNum} | Enrolled: ${sec.enrolled} | Room: ${sec.room}`;
    output.appendChild(div);
  });
}