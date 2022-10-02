"use strict";
let link;

getLink();

function getLink() {
  const inputEl = document.querySelector(".link");
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    link = inputEl.value;
    getShortenedLink();
  });
}

async function getShortenedLink() {
  try {
    const url = `https://api.shrtco.de/v2/shorten?url=${link}`;
    const res = await fetch(url);
    const data = await res.json();

    updateDomWithLinks(data);
  } catch (err) {
    console.log(err);
  }
}

function updateDomWithLinks(data) {
  console.log(data);
  const links = document.getElementById("links");
  links.innerHTML += `
  <div class='link'>
    <p>${data.result.original_link}</p>
    <div>
      <p>${data.result.full_short_link}</p>
      <button>Copy</button>
    </div>
  </div>`;
}
