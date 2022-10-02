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
      <p id='shortened-link'>${data.result.full_short_link}</p>
      <button onClick=copyToClipBoard()>Copy</button>
    </div>
  </div>`;
}

function copyToClipBoard() {
  // // Get the text field
  // const copyText = document.getElementById("shortened-link");

  // // Select the text field
  // copyText.select();
  // copyText.setSelectionRange(0, 99999); // For mobile devices

  // // Copy the text inside the text field
  // navigator.clipboard.writeText(copyText.value);

  // // Alert the copied text
  // alert("Copied the text: " + copyText.value);

  const text = document.getElementById("shortened-link").innerHTML;
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
