"use strict";
// let link;
const inputEl = document.querySelector(".link");
const errorMsg = document.getElementById("error-msg");

getLink();
removeErrorMsg();

function getLink() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = inputEl.value;
    if (link) {
      getShortenedLink(link);
      removeErrorMsg();
    } else {
      showErrorMsg();
    }
  });
}
function showErrorMsg() {
  // const inputEl = document.querySelector(".link");
  errorMsg.style.display = "block";
  inputEl.style.border = "2px solid var(--red)";
}

function removeErrorMsg() {
  errorMsg.style.display = "none";
  inputEl.style.border = "none";
}

async function getShortenedLink(link) {
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
      <button id='copy-btn' onClick=copyToClipBoard(this)>Copy</button>
    </div>
  </div>`;
}

function copyToClipBoard(e) {
  // Async Clipboard API method.
  const text = e.previousElementSibling.innerHTML;
  navigator.clipboard.writeText(text).then(
    function () {
      // console.log("Async: Copying to clipboard was successful!");
      updateBtnStyles(e);
    },
    function (err) {
      // console.error("Async: Could not copy text: ", err);
      alert("Failed to copy");
    }
  );
}

function updateBtnStyles(e) {
  const copyBtns = document.querySelectorAll("#copy-btn");
  console.log(copyBtns);
  copyBtns.forEach((btn) => {
    btn.innerHTML = "Copy";
    btn.classList.remove("clicked");
  });

  e.innerHTML = "Copied!";
  e.classList.add("clicked");
}
