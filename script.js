
let myLibrary = [];

let finalInput = 0;
let readstatus = "";

//** constructor */

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return (title + " " + author + " " + pages + " " + read);
    }
};


let myArray = "";
function addBookToLibrary() {

    myLibrary.push(finalInput);


    displayLibrary();
}



//* Gather form data */


let mySubmit = document.querySelector('.sub');

mySubmit.addEventListener('click', function() {
    let formAuthor = document.querySelector('#Author').value;
    let formTitle = document.querySelector('#Title').value;
    let formPages = document.querySelector('#Pages').value;
    let formread = document.querySelector('#read-status').checked;

    if (formread === true)
    {
        readstatus = " Read ";
       
    }
    else
    {  readstatus = " Not read yet "; }

 
    if (formAuthor == "" || formTitle == "" || formPages == "") {
        
    }
    else

    {finalInput = new Book (formAuthor, formTitle, formPages, formread); 

    addBookToLibrary();

    let myformAuthor = document.querySelector('#Author');
     myformAuthor.value = "";

     let myformTitle = document.querySelector('#Title');
     myformTitle.value = "";

     let myformPages = document.querySelector('#Pages');
     myformPages.value = ""

    
    const myForm = document.querySelector('.BookDisplay');
    const myOverlay = document.querySelector('#overlay');
    myForm.classList.remove('active');
    myOverlay.classList.remove('active');
    }
    

});


//* Popup */

const form = document.querySelector('#openForm');
form.addEventListener('click', ()=> {
    const myForm = document.querySelector('.BookDisplay');
    const myOverlay = document.querySelector('#overlay');
    myForm.classList.add('active');
    myOverlay.classList.add('active');
});

const closeButton = document.querySelector('.closeform');
closeButton.addEventListener('click', ()=> {
    const myForm = document.querySelector('.BookDisplay');
    const myOverlay = document.querySelector('#overlay');
    myForm.classList.remove('active');
    myOverlay.classList.remove('active');
});



//* Display books on the page */

let x = 0;
let z = 3;

function displayLibrary() {

    const myDisplay = document.querySelector('.book-info');
    const bookCard = document.createElement('div');
    myDisplay.appendChild(bookCard);
    bookCard.innerHTML = myLibrary[x].title;
    bookCard.classList.add('books');
    bookCard.dataset.indexNumber = `${z}`;

    const bookCard1 = document.createElement('div');
    myDisplay.appendChild(bookCard1);
    bookCard1.innerHTML = myLibrary[x].author;
    bookCard1.classList.add('books');
    bookCard1.dataset.indexNumber = `${z}`;

    const bookCard2 = document.createElement('div');
    myDisplay.appendChild(bookCard2);
    bookCard2.innerHTML = myLibrary[x].pages;
    bookCard2.classList.add('books');
    bookCard2.dataset.indexNumber = `${z}`;

    const bookCard3 = document.createElement('div');
    myDisplay.appendChild(bookCard3);
    bookCard3.innerHTML = readstatus;
    bookCard3.classList.add('books');
    bookCard3.dataset.indexNumber = `${z}`;
    bookCard3.dataset.columns = `${z}`;

    const bookCard4 = document.createElement('button');
    myDisplay.appendChild(bookCard4);
    bookCard4.innerHTML = "&times";
    bookCard4.classList.add('remove');
    bookCard4.dataset.indexNumber = `${z}`;

    const bookCard5 = document.createElement('div');
    myDisplay.appendChild(bookCard5);
    bookCard5.innerHTML = "Read or Not ?";
    bookCard5.classList.add('change');
    bookCard5.dataset.indexNumber = `${z}`;
    bookCard5.dataset.id = `${z}`;

    /* Change Read Status for newly created books*/

    const myChange = document.querySelector(`[data-id = '${z}']`);
    myChange.addEventListener('click', function() {

        a = myChange.dataset.indexNumber;
        console.log(a);
    
       const myReading = document.querySelector(`[data-columns= '${a}']`);
    
       if( myReading.innerHTML == " Not read yet ") 
       {
        myReading.innerHTML = " Read ";
       }
    
       else if (myReading.innerHTML == " Read ")
       {
        myReading.innerHTML = " Not read yet ";
       }
    
    
    });

    x += 1;
    z += 1;


    /* remove code again to reinitiliaze the query selector */

    const myRemove = document.querySelectorAll('.remove');

myRemove.forEach(remove => remove.addEventListener('click', function() {

    y = remove.dataset.indexNumber;
    
   const myBooks = document.querySelectorAll(`[data-index-number = '${y}']`);
   myBooks.forEach(function(e){
    e.remove();
   })

}));

}



//* Remove standard books */

const myRemove = document.querySelectorAll('.remove');

myRemove.forEach(remove => remove.addEventListener('click', function() {

    y = remove.dataset.indexNumber;
    
   const myBooks = document.querySelectorAll(`[data-index-number = '${y}']`);
   myBooks.forEach(function(e){
    e.remove();
   })

}));


//* Change Read Status for standanrd books*/

const myChange = document.querySelectorAll('.change');

myChange.forEach(change => change.addEventListener('click', function() {

    a = change.dataset.indexNumber;
    console.log(a);
    console.log("zab")
    
   const myReading = document.querySelector(`[data-columns= '${a}']`);

   if( myReading.innerHTML == " Not read yet ") 
   {
    myReading.innerHTML = " Read ";
   }

   else if (myReading.innerHTML == " Read ")
   {
    myReading.innerHTML = " Not read yet ";
   }


}));


