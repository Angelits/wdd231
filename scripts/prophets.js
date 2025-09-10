// debug logs so you can follow what happens
console.log('prophets.js loaded');

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    console.log('Fetching:', url);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network error: ${response.status} ${response.statusText}`);
    const data = await response.json();

    // quick checks in console
    console.log('Got JSON response');
    console.table(data.prophets);
    console.log('prophets array length:', data.prophets?.length ?? 'no prophets property');

    displayProphets(data.prophets);
  } catch (err) {
    console.error('Fetch error:', err);
    if (cards) cards.innerHTML = `<p class="error">Failed to load prophet data: ${err.message}</p>`;
  }
}

const displayProphets = (prophets) => {
  if (!Array.isArray(prophets)) {
    console.error('displayProphets expects an array but got:', prophets);
    if (cards) cards.innerHTML = `<p class="error">No prophet data available.</p>`;
    return;
  }

  // clear container in case function is called twice
  cards.innerHTML = '';

  prophets.forEach((prophet) => {
    const card = document.createElement('section');

    const fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // birth date & birthplace (fallback to 'Unknown' if missing)
    const birthDate = document.createElement('p');
    birthDate.className = 'prop-detail';
    birthDate.textContent = `Date of Birth: ${prophet.birthdate ?? 'Unknown'}`;

    const birthPlace = document.createElement('p');
    birthPlace.className = 'prop-detail';
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace ?? 'Unknown'}`;

    const portrait = document.createElement('img');
    portrait.src = prophet.imageurl ?? '';
    portrait.alt = `Portrait of ${prophet.name} ${prophet.lastname}`;
    portrait.loading = 'lazy';
    portrait.width = 340;
    portrait.height = 440;

    // append in the order you want
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

// start fetching after DOMContentLoaded (extra safety)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready — calling getProphetData()');
  getProphetData();
});