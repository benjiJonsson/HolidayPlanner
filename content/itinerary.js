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
function getAllEvents() {
    fetch(`holidayEvents`)
    .then(res => res.json())
    .then(json => {displayEvents(json)})
}
var counter = 3;
function displayEvents() {
let events = document.getElementById(options);
events.innerHTML="";
}

//KPF1 --> this function is a test to see if we can create a more dynamic itinerary
//currently print button was added to a test div on the index page
//this pops up a window for user to print activity information
function getOneEvent(){
    var div = document.getElementById("post1").innerHTML;
    var printWindow = window.open("","",'height=1000,width=1000');
    printWindow.document.write('<html>');
    printWindow.document.write('<body><h1> Activity Information<br>')
    printWindow.document.write(div);
    //printWindow.document.write(div2);
    //printWindow.document.write(div3);
    //printWindow.document.write(div4);
    //printWindow.document.write(div5);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

fileUpload.onchange = evt => {
    const [file] = fileUpload.files
    if (file) {
      clientUploadedImg.src=URL.createObjectURL(file)
    }
  }
/*
  var userTitle = document.getElementById("title");
var userType = document.getElementById("type");
var userRating = document.getElementById("rating");
var userAddress = document.getElementById("address");
  function addItem() {
    var div= document.getElementById("post2");
    const div = document.createElement("divPost");
    div.classList.add(div); // add class to div

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
    address.textContent += userAddress.value;

    //*adding date of post
    
    const date = new Date();
    const dateSubmitted = document.createElement("p");
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthSubmitted = monthName[date.getMonth()];
    const daySubmitted = date.getDate();
    const yearSubmitted = date.getFullYear();
    dateSubmitted.textContent += ("Posted on: " + daySubmitted+"/"+monthSubmitted+"/"+yearSubmitted);
    
    var div = document.getElementById(divPost);


}
*/