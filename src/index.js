// Firebase Code
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC2tmCpR80k83GnBUVsB8t4Kx8VhRivwu8",
  authDomain: "library-app-b2663.firebaseapp.com",
  projectId: "library-app-b2663",
  storageBucket: "library-app-b2663.appspot.com",
  messagingSenderId: "821924664668",
  appId: "1:821924664668:web:cc8920fca9fe5c03619d99",
};

const app = initializeApp(firebaseConfig);

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* Authentication Logic */

// Auth Sign In
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// Auth Sign Out
function signOutUser() {
  signOut(getAuth());
}

// Auth State Change
function initFirebaseAuth() {
  // Listen to auth state changes
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

// Retur the signed-in-user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

function authStateObserver(user) {
  if (user) {
    const userImg = document.getElementById("userImage");
    userImg.src = getProfilePicUrl();

    const userName = document.getElementById("userName");
    userName.innerHTML = getUserName();

    const signOutBtn = document.getElementById("signOut");
    signOutBtn.classList.remove("hidden");

    const signInBtn = document.getElementById("signInBtn");
    signInBtn.classList.add("hidden");

    const userInfo = document.getElementById("userInfo");
    userInfo.classList.add("mr-20");
  } else {
    const userImg = document.getElementById("userImage");
    userImg.src = "images/placeholder-image.jpeg";

    const userName = document.getElementById("userName");
    userName.innerHTML = "";

    const signOutBtn = document.getElementById("signOut");
    signOutBtn.classList.add("hidden");

    const signInBtn = document.getElementById("signInBtn");
    signInBtn.classList.remove("hidden");

    const userInfo = document.getElementById("userInfo");
    userInfo.classList.remove("mr-20");
  }
}

/* Cloud Firestore Database logic */

import {
  getFirestore,
  addDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

// Saves a new book to Cloud Firestore.

async function saveBook(bookInfo) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "messages"), {
      bookAuthor: bookInfo.author,
      bookTitle: bookInfo.title,
      bookPages: bookInfo.pages,
      bookReadStatus: bookInfo.read,
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

// Loads books and listens for upcoming ones
function loadBooks() {
  // Create the query to load books
  const recentBooksQuery = query(collection(getFirestore(), "messages"));

  // Start listening to the query.
  onSnapshot(recentBooksQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "removed") {
        console.log("DB item was removed");
      } else {
        const book = change.doc.data();
        loadNewBook(
          book.bookTitle,
          book.bookAuthor,
          book.bookPages,
          book.bookReadStatus
        );
      }
    });
  });
}

// JS Code

function loadNewBook(title, author, pages, readStatus) {
  const myDisplay = document.querySelector(".book-info");
  const bookCard = document.createElement("div");
  myDisplay.appendChild(bookCard);
  bookCard.innerHTML = title;
  bookCard.classList.add("bookInfo");

  const bookCard1 = document.createElement("div");
  myDisplay.appendChild(bookCard1);
  bookCard1.innerHTML = author;
  bookCard1.classList.add("bookInfo");

  const bookCard2 = document.createElement("div");
  myDisplay.appendChild(bookCard2);
  bookCard2.innerHTML = pages;
  bookCard2.classList.add("bookInfo");

  const bookCard3 = document.createElement("div");
  myDisplay.appendChild(bookCard3);
  if (readStatus == true) {
    bookCard3.innerHTML = "Read";
  } else {
    bookCard3.innerHTML = "Not Read yet";
  }

  bookCard3.classList.add("bookInfo");
  bookCard3.dataset.indexNumber = `${z}`;

  const bookCard4 = document.createElement("button");
  myDisplay.appendChild(bookCard4);
  bookCard4.innerHTML = "&times";
  bookCard4.classList.add("remove");

  const bookCard5 = document.createElement("div");
  myDisplay.appendChild(bookCard5);
  bookCard5.innerHTML = "Read or Not ?";
  bookCard5.classList.add("change");
}

const signInBtn = document.querySelector(".signIn");
signInBtn.addEventListener("click", signIn);

const signOutBtn = document.getElementById("signOut");
signOutBtn.addEventListener("click", signOutUser);

let myLibrary = [];

let finalInput = 0;
let readstatus = "";

//** constructor */

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " " + author + " " + pages + " " + read;
  };
}

let myArray = "";
function addBookToLibrary() {
  myLibrary.push(finalInput);
  saveBook(finalInput);
}

//* Gather form data */

/* form validation - constraint validation API */

const authorInput = document.querySelector("#Author");
const bookTitle = document.querySelector("#Title");
const bookPages = document.querySelector("#Pages");
const readStatus = document.querySelector("#read-status");
const myForm = document.querySelector("form");

function inputValidate() {
  authorInput.addEventListener("input", function () {
    if (authorInput.validity.valueMissing) {
      authorInput.setCustomValidity(
        "You did not insert any value, please do !"
      );
      authorInput.reportValidity();
    } else {
      authorInput.setCustomValidity("");
    }
  });

  bookTitle.addEventListener("input", function () {
    if (bookTitle.validity.valueMissing) {
      bookTitle.setCustomValidity("You did not insert any value, please do !");
      bookTitle.reportValidity();
    } else {
      bookTitle.setCustomValidity("");
    }
  });

  bookPages.addEventListener("input", function () {
    if (bookPages.validity.valueMissing) {
      bookPages.setCustomValidity("You did not insert any value, please do !");
      bookPages.reportValidity();
    } else {
      bookPages.setCustomValidity("");
    }
  });
}
inputValidate();

function showMyError() {
  function validateAuthor() {
    if (authorInput.validity.valueMissing) {
      authorInput.setCustomValidity(
        "You did not insert any value, please do !"
      );
      authorInput.reportValidity();
    } else {
      authorInput.setCustomValidity("");
    }
  }

  function validateTitle() {
    if (bookTitle.validity.valueMissing) {
      bookTitle.setCustomValidity("You did not insert any value, please do ! ");
      bookTitle.reportValidity();
    } else {
      bookTitle.setCustomValidity("");
    }
  }

  function validatePages() {
    if (bookPages.validity.valueMissing) {
      bookPages.setCustomValidity("You did not insert any value, please do !");
      bookPages.reportValidity();
    } else {
      bookPages.setCustomValidity("");
    }
  }

  validateAuthor();
  validateTitle();
  validatePages();
}

function submitValidate() {
  myForm.addEventListener("submit", function (event) {
    let formAuthor = document.querySelector("#Author").value;
    let formTitle = document.querySelector("#Title").value;
    let formPages = document.querySelector("#Pages").value;
    let formread = document.querySelector("#read-status").checked;

    if (formread === true) {
      readstatus = " Read ";
    } else {
      readstatus = " Not read yet ";
    }

    if (
      !authorInput.validity.valid ||
      !bookTitle.validity.valid ||
      !bookPages.validity.valid
    ) {
      showMyError();
      event.preventDefault();
    } else {
      event.preventDefault();
      finalInput = new Book(formAuthor, formTitle, formPages, formread);

      addBookToLibrary();

      // Push book info to Cloud Firestore

      let myformAuthor = document.querySelector("#Author");
      myformAuthor.value = "";

      let myformTitle = document.querySelector("#Title");
      myformTitle.value = "";

      let myformPages = document.querySelector("#Pages");
      myformPages.value = "";

      const myForm = document.querySelector(".BookDisplay");
      const myOverlay = document.querySelector("#overlay");
      myForm.classList.remove("active");
      myOverlay.classList.remove("active");
    }
  });
}

submitValidate();

//* Popup */

const form = document.querySelector("#openForm");
form.addEventListener("click", () => {
  const myForm = document.querySelector(".BookDisplay");
  const myOverlay = document.querySelector("#overlay");
  myForm.classList.add("active");
  myOverlay.classList.add("active");
});

const closeButton = document.querySelector(".closeform");
closeButton.addEventListener("click", () => {
  const myForm = document.querySelector(".BookDisplay");
  const myOverlay = document.querySelector("#overlay");
  myForm.classList.remove("active");
  myOverlay.classList.remove("active");
});

//* Display books on the page */

let x = 0;
let z = 3;

// function displayLibrary() {
//   const myDisplay = document.querySelector(".book-info");
//   const bookCard = document.createElement("div");
//   myDisplay.appendChild(bookCard);
//   bookCard.innerHTML = myLibrary[x].title;
//   bookCard.classList.add("bookInfo");
//   bookCard.dataset.indexNumber = `${z}`;

//   const bookCard1 = document.createElement("div");
//   myDisplay.appendChild(bookCard1);
//   bookCard1.innerHTML = myLibrary[x].author;
//   bookCard1.classList.add("bookInfo");
//   bookCard1.dataset.indexNumber = `${z}`;

//   const bookCard2 = document.createElement("div");
//   myDisplay.appendChild(bookCard2);
//   bookCard2.innerHTML = myLibrary[x].pages;
//   bookCard2.classList.add("bookInfo");
//   bookCard2.dataset.indexNumber = `${z}`;

//   const bookCard3 = document.createElement("div");
//   myDisplay.appendChild(bookCard3);
//   bookCard3.innerHTML = readstatus;
//   bookCard3.classList.add("bookInfo");
//   bookCard3.dataset.indexNumber = `${z}`;
//   bookCard3.dataset.columns = `${z}`;

//   const bookCard4 = document.createElement("button");
//   myDisplay.appendChild(bookCard4);
//   bookCard4.innerHTML = "&times";
//   bookCard4.classList.add("remove");
//   bookCard4.dataset.indexNumber = `${z}`;

//   const bookCard5 = document.createElement("div");
//   myDisplay.appendChild(bookCard5);
//   bookCard5.innerHTML = "Read or Not ?";
//   bookCard5.classList.add("change");
//   bookCard5.dataset.indexNumber = `${z}`;
//   bookCard5.dataset.id = `${z}`;

//   /* Change Read Status for newly created books*/

//   const myChange = document.querySelector(`[data-id = '${z}']`);
//   myChange.addEventListener("click", function () {
//     a = myChange.dataset.indexNumber;

//     const myReading = document.querySelector(`[data-columns= '${a}']`);

//     if (myReading.innerHTML == " Not read yet ") {
//       myReading.innerHTML = " Read ";
//     } else if (myReading.innerHTML == " Read ") {
//       myReading.innerHTML = " Not read yet ";
//     }
//   });

x += 1;
z += 1;

/* remove code again to reinitiliaze the query selector */

//   const myRemove = document.querySelectorAll(".remove");

//   myRemove.forEach((remove) =>
//     remove.addEventListener("click", function () {
//       y = remove.dataset.indexNumber;

//       const myBooks = document.querySelectorAll(`[data-index-number = '${y}']`);
//       myBooks.forEach(function (e) {
//         e.remove();
//       });
//     })
//   );
// }

//* Remove standard books */

const myRemove = document.querySelectorAll(".remove");

myRemove.forEach((remove) =>
  remove.addEventListener("click", function () {
    y = remove.dataset.indexNumber;

    const myBooks = document.querySelectorAll(`[data-index-number = '${y}']`);
    myBooks.forEach(function (e) {
      e.remove();
    });
  })
);

//* Change Read Status for standanrd books*/

const myChange = document.querySelectorAll(".change");

myChange.forEach((change) =>
  change.addEventListener("click", function () {
    a = change.dataset.indexNumber;

    const myReading = document.querySelector(`[data-columns= '${a}']`);

    if (myReading.innerHTML == " Not read yet ") {
      myReading.innerHTML = " Read ";
    } else if (myReading.innerHTML == " Read ") {
      myReading.innerHTML = " Not read yet ";
    }
  })
);

// Firebase Initializations
initFirebaseAuth();
loadBooks();
