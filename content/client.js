//kpf1->this function takes the header section and creates buttons
//to act as toggle tabs-- this fucntion sets the clicked
//tab as active and allows user to access other content
//without the need to open a different html
function Activate(evt, pageName) {
    var i, category_cards, cards;

    category_cards = document.getElementsByClassName("category_cards");
    for (i = 0; i < category_cards.length; i++) {
        category_cards[i].style.display = "none";
    }
    cards = document.getElementsByClassName("cards");
    for (i = 0; i < cards.length; i++) {
        cards[i].className = cards[i].className.replace("active");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += "active";
}
/*
imageUpload.onchange = event => {
    const [file] = imageUpload.files
    if (file) {
        userImage.src = URL.createObjectURL(file)

    }
}
*/
//KPF1-> declaring variables from upload page inputs
var userTitle = document.getElementById("titleInput");
var userType = document.getElementById("typeDropDown");
var userRating = document.getElementById("ratingDropDown");
var userComment = document.getElementById("commentInput");
var userStreet = document.getElementById("street");
var userTown = document.getElementById("Town");
var userCounty = document.getElementById("county");
var userPostCode = document.getElementById("post");


//var foodGrid = document.getElementById("foodGrid");
var counter = 3;

//KPF1 -> this function creates a new div with new elements
//when make post is clicked on upload post page
//it is added to whichever type it belongs to (not done yet)
//ex posts with type "Beach" will be displayed in toggle tab "Beach" 
function createDiv() {
    counter++;
    const div = document.createElement("div" + counter);
    div.classList.add("newPost" + counter); // add class to div

    //image in div
    const image = document.createElement("p");
    image.textContent += userImage.src;
    image.style.alignItems = "center";
    image.style.textAlign = "center";

    //title in div
    const title = document.createElement("p");
    title.textContent += userTitle.value;

    //rating in div
    const rating = document.createElement("p");
    rating.textContent += userRating.value;

    //type in div
    const type = document.createElement("p");
    type.textContent += userType.value;
    var type1 = userType.value;
    //address in div
    const address = document.createElement("p");
    address.textContent += ("Located at: " + userStreet.value + ", "+userTown.value + ", " + userCounty.value + ", " + userPostCode.value);

    //*adding date of post
    
    const date = new Date();
    const dateSubmitted = document.createElement("p");
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthSubmitted = monthName[date.getMonth()];
    const daySubmitted = date.getDate();
    const yearSubmitted = date.getFullYear();
    dateSubmitted.textContent += ("Posted on: " + daySubmitted+"/"+monthSubmitted+"/"+yearSubmitted);
    
    var grid = document.getElementById(`${type1}`);


    // SD302: css styling
    div.style.border = "2px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.padding = "10px";
    div.style.width = "250px";
    div.style.margin = "10px";
    div.style.backgroundColor = "#f7f7f7";
    div.style.color = "#4a4a4a";


   /* div.style.borderRadius = "45px";
    div.style.display = "block";
    div.style.textAlign = "center";
    div.style.maxWidth = "175px";
    div.style.maxHeight = "250px";
    div.style.fontSize = "small";*/

    div.appendChild(image); 
    div.appendChild(title);
    div.appendChild(rating);
    div.appendChild(type);
    div.appendChild(address);
    div.appendChild(dateSubmitted);
    grid.appendChild(div);

    
   
    /* SD302: Create Comment Section */

    // create div element
    const commentSection = document.createElement("div");
    // comment section styling
    commentSection.style.display = "flex";
    commentSection.style.flexDirection = "column";
    commentSection.style.alignItems = "center";
    commentSection.style.width = "100%";
    commentSection.style.marginTop = "20px";

    // create comment section
    const commentTextarea = document.createElement("textarea");
    commentTextarea.placeholder = "Add a comment..."
    // comment text styling
    commentTextarea.style.width = "100%";
    commentTextarea.style.height = "80px";
    commentTextarea.style.padding = "10px";
    commentTextarea.style.borderRadius = "5px";
    commentTextarea.style.border = "1px solid #ccc";
    commentTextarea.style.marginBottom = "10px";


    const commentBtn = document.createElement("buttom");
    commentBtn.textContent = "Submit";
    // comment button style
    commentBtn.style.backgroundColor ="#4caf50";
    commentBtn.style.color = "white";
    commentBtn.style.borderRadius = "5px";
    commentBtn.style.border = "none";
    commentBtn.style.padding = "10px";
    commentBtn.style.cursor = "pointer";


    commentBtn.addEventListener("click", function () {
        const comment = document.createElement("p");
        comment.textContent = commentTextarea.value;
        comment.style.marginBottom = "10px"; //styling

        div.appendChild(comment);
        commentTextarea.value = "";

        // save comment to server - attempt
        const data = { comment: comment.textContent };
        fetch('/save-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Comment saved: ', data);
            })
            .catch(error => {
                console.error('Error saving comment: ', error);
            })

    });

    commentSection.appendChild(commentTextarea);
    commentSection.appendChild(commentBtn);
    div.appendChild(commentSection);

    // add div to grid
    grid.appendChild(div);

    /* end of COMMENT SECTION */

}

//For post a post to the database
function thisNewpost(){
    let thisTitle=document.getElementById("titleInput").value
    let thisType=document.getElementById("typeDropDown").value
    let thisRating=document.getElementById("ratingDropDown").value
    let thisAdress=document.getElementById("resultTown").innerHTML
    let thisUser=localStorage.getItem("thisUser")
    let thisComment=document.getElementById("commentInput").value
    let thisTrans = new Array()
    let tmp=document.getElementsByName("transportation")
    for (let i = 0; i < tmp.length; i++) {
        if ( tmp[i].checked ==true ) { thisTrans.push(tmp[i].value) }
    }
    return newPost={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:thisUser,name: thisTitle, type: thisType , location:thisAdress,transportation:thisTrans,rating:thisRating, comment: thisComment})
    }
}
    // console.log(thisTrans)

    //fetch /uploadPost
async function uploadPost(){
    let newPost=thisNewpost()
    console.log(newPost)
    fetch('/uploadPost',newPost)
    .then (res => res.text())
    .then (txt => alert(txt))
    .then(jsn=>console.log(jsn.msg))
}
    //get res

    // cleardata

    //catch err




//KPF1 -> this function clears users inputs if they are unhappy w their post
//prior to submission they are able to reset all input values
//by clicking "Clear Submission" button
function clearSubmission() {
    userTitle.value = "";
    userType.value = "";
    userRating.value = "";
    userComment.value = "";
    userStreet.value = "";
    userTown.value = "";
    userCounty.value = "";
    userPostCode.value="";

}


//here is to use browser's prompt window to log in
/*
1.fetch the token to the server
2.receive response and parseResponse: success? null: show 'failed'
3.judge result: success? to maker page: show 'failed'
*/
function userLogin() {
    fetch("/login", {
        method: 'GET'})
        .then(res => {
            // console.log(res)
            return parseResponse(res)})
        .then(
            jsn=>{
                localStorage.setItem('thisUser',jsn.msg)
                // console.log(localStorage.getItem('thisUser'))
                // localStorage.setItem('_id',jsn.msg)
                // // thisUser =localStorage.getItem('thisUser')
                // document.getElementById("userId").innerHTML="Welcome! "+jsn.msg
               })
}

function parseResponse(response) {
    if (response.status == 401) {
        alert("login failed or logout.")
    } else {
        response.status==200?alert("Login success!"):null
        return response.json()
    }
}

//receive the res from server and alert the result of registration
let queryParams = new URLSearchParams(location.search);
if(queryParams.get('signupresult')){
    console.log("getresult")
    let thisResult=queryParams.get('signupresult')
    if (thisResult== "success") {
            alert("Sign up success! Please login.")
    } 
    // else if (thisResult== "failed") {
    //     console.log('failed')
    //     alert("Sorry, username duplicated.")
    // }
}

/*
//bsj5 - Adding in client side to display 

//BEACH
function getBeachEvents(){
    fetch(`/holidayEvents/`)
    .then (res => res.json())
    .then (jsn => displayBeachEvents( jsn))
}

//<img src="images/west-sands.jpeg" style="align-items: center; width: 200px;" class="center">

function displayBeachEvents( beaches){
    console.log( beaches)
    let beachEvents = document.getElementById("beachEvents");
    for(beach of beaches) {
        let div = document.createElement("div")
        div.value = beach.id
       // div.class = "postTest"
       div.className = "postTest";
        let img = document.createElement("img");
        img.setAttribute("src", beach.src);
        img.setAttribute("style", "align-items: center");
        img.setAttribute("width", "200");
        div.appendChild(img);
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let p4 = document.createElement("p")
        p1.innerHTML = beach.name 
        p2.innerHTML = beach.rating
        p3.innerHTML = beach.location
        p4.innerHTML = beach.transportation
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        beachEvents.appendChild(div);
    }
}
document.getElementById("beachButton").onclick = getBeachEvents();
*/
window.onload=function(){
    document.getElementById("uploadPost").onclick=submitPost
}

function getOneEvent() {
var div = document.getElementById("post1");
var printWindow = window.open("","","height=1000, width =1000");
printWindow.write('<html>');
printWindow.write('<body><h1>Activity Information<br>');
printWindow.write(div);
printWindow.write('</body></html>');
printWindow.close();
printWindow.print();
}








/* SD302: LOGIN 
const signUpForm = document.querySelector('#signUpForm');
const loginForm = document.querySelector('#loginForm');

// sign up
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = signUpForm.elements.username.value;
    const password = signUpForm.elements.password.value;

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then((data) => {
            alert(data.message);
            signUpForm.reset();
        })
        .catch((error) => console.error(error));
});

// log in
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = loginForm.elements.username.value;
    const password = loginForm.elements.password.value;

    fetch('/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then((data) => {
            alert(data.message);
            loginForm.reset();
        })
        .catch((error) => console.error(error));
});

*/

