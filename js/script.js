/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const paginationContainer = document.getElementsByClassName(
  "[class='pagination']",
);
const paginationList = document.querySelector("[class='link-list']");
const studentspPage = 9;
const studenList = document.querySelector("[class='student-list']");

//select header and create the input html to insert
const headerInput = document.querySelector("[class='header']");
const inputhtml = `
  <label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
  `;
headerInput.insertAdjacentHTML("beforeend", inputhtml);

const input = headerInput.querySelector("#search");
console.log(typeof input);
const searchbutton = headerInput.querySelector("button");

function addPagination(list) {
  //show 9 students per page
  const buttonsQty = Math.ceil(list.length / studentspPage);
  console.log(buttonsQty);
  console.log(list.length);

  //begin the number creation from 1 forward
  for (let i = 1; i <= buttonsQty; i++) {
    const html = `
      <li>
      <button type ="button">${i}</button>
      </li>
        `;

    paginationList.insertAdjacentHTML("beforeend", html);
  }
  paginationList.querySelector("button").classList.add("active");
  console.log();
}

function showPage(list, page) {
  //define at which index we are goning to start counting
  const startindex = page * studentspPage - studentspPage;
  const endindex = page * studentspPage - 1;

  //reset the div from the displayed students
  studenList.innerHTML = "";
  //set counter to 0 so we start from the 0 index where theres values stored too
  for (let i = 0; i < list.length; i++) {
    //create the html for each student and call the data by its property on the index form the iteration
    if (i >= startindex && i <= endindex) {
      const html = `
      <li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
      <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
      <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">${list[i].registered.date}</span>
      </div>
      </li>`;

      //insert the html to show the students
      studenList.insertAdjacentHTML("beforeend", html);
    }
  }
}

//target the button clicked and change the class and
paginationList.addEventListener("click", (e) => {
  const activebutton = paginationList.querySelector("[class='active']");

  //print the button we are clicking
  const buttonClicked = e.target.closest("button");

  console.log(`${buttonClicked.textContent} button clicked`);

  activebutton.classList.remove("active");

  buttonClicked.classList.add("active");
  console.log(`${buttonClicked.classList} button active`);
  showPage(data, buttonClicked.textContent);
});

function searchFunc(text, list) {
  //save the input on namelovercase
  const namelowercase = text.toLowerCase();

  //i created an array to store the objects that coincide with the text
  const searchdata = [];
  //iteration for every object to search for the object that his name or lastname coincide with the typed text
  for (let i = 0; i < list.length; i++) {
    if (
      (text.length !== 0 &&
        list[i].name.first.toLowerCase().includes(namelowercase)) ||
      list[i].name.last.toLowerCase().includes(namelowercase)
    ) {
      //empty de studentlist  ul to insert the new list that is stored in the array
      studenList.innerHTML = "";
      //push each object that coincide to the arr
      searchdata.push(list[i]);
    } else {
      showPage(data, 1);
    }
  }

  //empty the buttons div so displays the buttons
  paginationList.innerHTML = "";
  console.log(`arreglo de busqueda ${searchdata.length}`);

  showPage(searchdata, 1);
  addPagination(searchdata);
}

searchbutton.addEventListener("click", (e) => {
  const text = input.value;

  searchFunc(text, data);
});

input.addEventListener("keyup", () => {
  const text = input.value;

  searchFunc(text, data);
});

showPage(data, 1);

addPagination(data);

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

// Call functions
