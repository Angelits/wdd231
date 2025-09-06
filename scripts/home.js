// Responsive Menu
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu").querySelector("ul");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Dynamic Year + Last Modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Course Array
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, completed: false },
  { code: "WDD231", name: "Front-End Web Development I", credits: 2, completed: false },
  { code: "CSE110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, completed: false },
];

const courseList = document.getElementById("courseList");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(filter) {
  courseList.innerHTML = "";

  let filteredCourses = courses;
  if (filter === "wdd") {
    filteredCourses = courses.filter(c => c.code.startsWith("WDD"));
  } else if (filter === "cse") {
    filteredCourses = courses.filter(c => c.code.startsWith("CSE"));
  }

  let credits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course", course.completed ? "completed" : "not-completed");
    div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    courseList.appendChild(div);
  });

  totalCredits.textContent = `Total Credits: ${credits}`;
}

// Button filters
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    displayCourses(btn.dataset.filter);
  });
});

// Default view
displayCourses("all");