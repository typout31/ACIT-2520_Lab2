var movies = []
var viewcount = {}
var viewcount_lowercase = {}
const filter_input = document.getElementById("filter")
// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var MovieHistory = document.querySelector(".history-table")
var viewcount = JSON.parse(localStorage.getItem('viewcount'))
if (viewcount == null) {
    var viewcount = {}
}
addMovieHistory('')
console.log(window.localStorage.myMovieList_reference)
if (window.localStorage.myMovieList === null) {
    window.localStorage.myMovieList_reference = ""
}
myMovieList.innerHTML =  window.localStorage.myMovieList_reference;
saved_history = {}


// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
    window.localStorage.myMovieList_reference = '';
}

function addMovieHistory(movieEvent) {
    movies.push(movieEvent);

    if (movieEvent != ''){
        for (movie in viewcount) {
            viewcount_lowercase[movie.toLowerCase()] = viewcount[movie];
        }

        if (movieEvent in viewcount) {
            viewcount[movieEvent] += 1
        } else if (movieEvent.toLowerCase() in viewcount_lowercase) {
            for (movie in viewcount) {
                if (movie.toLowerCase() == movieEvent.toLowerCase()) {
                    viewcount[movie] += 1
                }
            }
        } else {
            viewcount[movieEvent] = 1
        }
    }
    

    MovieHistory.innerHTML = 
        `<table>
         <tr>
            <th scope="col" style="width:300px">Title</th>
            <th scope="col" style="width:300px">Views</th>
         </tr>` + update_history() + `</table>`
} 


function update_history() {
    updated_history = ''

    for (movie in viewcount) {
        updated_history += `<tr>
                                <th scope="col" style="width:300px">${movie}</th>
                                <th scope="col" style="width:300px">${viewcount[movie]}</th>
                            </tr>`
    }

    return updated_history
}


filter_input.addEventListener('keyup', Moviefilter);

function Moviefilter(e) {
    myMovieList.innerHTML = localStorage.myMovieList_reference
    const userinput = filter_input.value
    const list_items = myMovieList.getElementsByTagName("li")
    return_innerHTML = ""
    if (userinput != ""){
        for (let i = 0, len = list_items.length; i < len; i++) {
            list_string = list_items[i].innerHTML
            found_string = list_string.includes(userinput)
            if (found_string == true) {
                return_innerHTML += `<li>${list_string}</li>`
            }
        } 
    } else {
        return_innerHTML = localStorage.myMovieList_reference
    };
    myMovieList.innerHTML = return_innerHTML
};

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    console.log(userTypedText)
    if (userTypedText == "") {
        alert('Invalid Movie Input!');
    } else {
        // Step 2: Create an empty <li></li>
        var li = document.createElement("li"); // <li></li>

        // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
        var textToInsert = document.createTextNode(userTypedText);

        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        li.appendChild(textToInsert);

        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        if (!(userTypedText in viewcount)) {
            myMovieList.appendChild(li);
        } else {}
        
        window.localStorage.myMovieList_reference +=`<li>${userTypedText}</li>`
        addMovieHistory(userTypedText);
        localStorage.setItem('viewcount', JSON.stringify(viewcount));
        // Step 6: Call the clearInput function to clear the input field
        clearInput();
    }
}
