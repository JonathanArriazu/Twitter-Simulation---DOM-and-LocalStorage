const tweetForm = document.querySelector("#formulario"); //--> Para agregar tweets
//const sendTweet = document.querySelector("#agregar");
const userTweets = document.querySelector("#lista-tweets"); //--> Para eliminar tweets con un boton
const tweetElement = document.querySelector("#tweet");

let tweetsList = [];

//Listeners
loadListeners();

function loadListeners() {
  tweetForm.addEventListener("submit", addTweet);
  userTweets.addEventListener("click", deleteTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweetsList = JSON.parse(localStorage.getItem("tweets")) || [];
    tweetsHTML();
  });
}

function addTweet(e) {
  e.preventDefault();
  if (tweetElement.value === "") {
    const paragraph = document.createElement("p");
    const errorMessage = "No se puede ingresar un tweet vacío";
    paragraph.textContent = errorMessage;
    paragraph.classList.add("tweet-error");
    tweetForm.append(paragraph);
    return;
  } else if (tweetElement.value.length > 140) {
    const paragraph = document.createElement("p");
    const errorMessage =
      "No se puede ingresar un texto que supere los 140 caracteres";
    paragraph.textContent = errorMessage;
    paragraph.classList.add("tweet-error");
    tweetForm.append(paragraph);
    return;
  }
  if (tweetForm.lastElementChild.classList.contains("tweet-error")) {
    tweetForm.removeChild(tweetForm.lastElementChild);
  }
  readTweet();
  tweetsHTML();
  tweetForm.reset();
}

function readTweet() {
  const tweet = {
    text: tweetElement.value,
    id: Date.now().toString(),
  };
  tweetsList.push(tweet);
}

function deleteTweet(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-tweet")) {
    const tweetId = e.target.getAttribute("data-id");
    tweetsList = tweetsList.filter((tweet) => tweet.id !== tweetId);
    tweetsHTML();
  }
}

function tweetsHTML() {
  emptyTweet();
  tweetsList.forEach((tweet) => {
    const tweetsContainer = document.createElement("div");
    tweetsContainer.innerHTML = `
    <p> ${tweet.text}</p>
    <button href='#' class='delete-tweet' data-id='${tweet.id}'>X</button>
    `;
    storageSynchronize();
    userTweets.append(tweetsContainer);
  });
}

function storageSynchronize() {
  localStorage.setItem("tweets", JSON.stringify(tweetsList));
}

function emptyTweet() {
  while (userTweets.firstChild) {
    userTweets.removeChild(userTweets.firstChild);
  }
}
