const container = document.getElementById("membersContainer");

// Fetch member data from JSON asynchronously
async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to load members:", error);
    container.innerHTML = "<p>Failed to load members.</p>";
  }
}

// Display members
function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    // Image
    const img = document.createElement("img");
    img.src = member.image;
    img.alt = member.name;
    img.width = 200;
    img.height = 150;
    img.loading = "lazy";
    img.decoding = "async";

    const info = document.createElement("div");
    info.classList.add("member-info");
    info.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.url}" target="_blank" rel="noopener">Visit Website</a>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <p class="extra-info">${member.info}</p>
    `;

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// Toggle view buttons
document.getElementById("gridView").addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

document.getElementById("listView").addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

// Fetch members on load
fetchMembers();

// ✅ Footer Year + Last Modified
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
