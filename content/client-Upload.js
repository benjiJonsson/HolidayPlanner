// getting images from client and storing them in server
/**
 * Represents a fetch function.
 * @constructor
 * @param {filename} - name of image file fetched from client and stored into server
 */
function getRelativePath(filename){
    let path = window.location.pathname.replace(/\/[^\/]*$/, '');
    let relativePath = path + '/' + filename;
    return relativePath;
}
//need to declare vars earlier
var thisTitle=document.getElementById("titleInput").value
var thisType=document.getElementById("typeDropDown").value
var thisRating=document.getElementById("ratingDropDown").value
var thisAdress=document.getElementById("resultTown").innerHTML
var thisUser=localStorage.getItem("thisUser")
var thisComment=document.getElementById("commentInput").value

/**
 * Represents a an image fetch.
 * @param {file} - name of file fetched from user's personal file folder
 */
fileUpload.onchange = evt => {
    const [file] = fileUpload.files
    if (file) {
      clientUploadedImg.src=URL.createObjectURL(file)
    }
  }

   
///HT61
//For post a post to the database
/**
 * Represents a post function sent to database.
 * @param {img1} - html element where img1 is posted
 * @param {thisTitle} - html element where title input is fetched by value
 * @param {thisType} - html element where type input is fetched by value
 * @param {thisRating} - html element where rating input is fetched by value
 * @param {thisAdress} - html element where address input is fetched by value
 * @param {thisUser} - localstorage item where user is fetched
 * @param {thisComment} - html element where comment input is fetched by value
 * @param {finalDate} - element where date string is generated
 */
function thisNewpost(){
    let img1 = document.getElementById("clientUploadedImg");
    let resEle = document.querySelector(".result");
    var context = resEle.getContext("2d");
    resEle.width = 250;
    resEle.height = 250; 
    resEle.style.display="none";
    context.drawImage(img1, 0, 0, 100, 80); 
    const dataURL = canvas.toDataURL();
    let thisTitle=document.getElementById("titleInput").value
    let thisType=document.getElementById("typeDropDown").value
    let thisRating=document.getElementById("ratingDropDown").value
    let thisAdress=document.getElementById("resultTown").innerHTML;
    console.log(thisAdress);
    let thisUser=localStorage.getItem("thisUser")
    let  thisComment=document.getElementById("commentInput").value
   // let src = getRelativePath(document.getElementById("upload-img").files[0].name);
   // const dataURL = canvas.toDataURL();

  // const dataURL = canvas.toDataURL();
  //var clientUploadedImg=document.getElementById("clientUploadedImg").value
   // var dataURL = clientUploadedImg.toDataURL();
    let thisTrans = new Array()
    let thisDate= new Date
    let thisDateString = thisDate.toISOString()
    let finalDate = thisDateString.slice(0,10);
    console.log(finalDate)
    let tmp=document.getElementsByName("transportation")
    for (let i = 0; i < tmp.length; i++) {
        if ( tmp[i].checked ==true ) { thisTrans.push(tmp[i].value) }
    }
    return newPost={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:thisUser,name: thisTitle,date:finalDate, type: thisType , location:thisAdress,transportation:thisTrans,rating:thisRating, comment: thisComment, src: dataURL})
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
}

//KPF1 -> this function clears users inputs if they are unhappy w their post
//prior to submission they are able to reset all input values
//by clicking "Clear Submission" button

//KPF1-> declaring variables from upload page inputs

function clearSubmission() {
    document.getElementById("titleInput").value= "";
    document.getElementById("typeDropDown").value= "";
    document.getElementById("ratingDropDown").value= "";
    document.getElementById("adressInput").value= "";
    document.getElementById("commentInput").value= "";
   
}

window.onload=function(){
    document.getElementById("clearPost").onclick=clearSubmission
    document.getElementById("uploadPost").onclick=uploadPost
}

/*
const get=async()=>{
    const res = await fetch("https://api.getAddress.io/validate/KY169XW?api-key=6qSjCLKgnE-RokgOTA_Lfg39070");
    console.log(res);
    const data = res.json();
    return data;
  };
  */
 //this function uses an external api to validate location via postal code
 // if post code is entered as "OX49 5NU", the result will be true, as it is valid
 // if post code is invalid it will disable the upload post button

 /**
 * Represents a fetch function for an external api.
 * @constructor
 * @param {url_2} - url input for api fetch
 * @param {result} - stores data fetched from external api
 * @param {thisAddress} - html element where address input is fetched by value
 * @param {resultPost} - html element where address input is placed if valid

 */
 function post(){
  var postCode =document.getElementById("adressInput").value
  const url = "https://api.postcodes.io/postcodes/"+postCode+"/validate"
  async function getapi(url_2) {
    const response = await fetch(url);
    var data = await response.json();
        console.log(data);
    result = data
   console.log(result.result)
   document.getElementById("result1").innerHTML=result.result
    var resultPost = document.getElementById("result1").innerHTML;
    console.log(resultPost);
    if (resultPost !== "true"){
        resultPost.value="";
        thisAdress.value ="";
        window.alert("The post code: " +postCode+" is not valid. Please enter a valid post code, for example: OX49 5NU");
        document.getElementById("uploadPost").onclick=""

     }
     else{
        
        window.alert("This zipcode is valid. You may now upload your post")
        getTown();
        document.getElementById("uploadPost").onclick=uploadPost

     }
    }
  

  getapi(url);

}

 /**
 * Represents a fetch function for an external api.
 * @param {result} - stores data fetched from external api
 * @param {thisAddress} - html element where address input is fetched by value
 * @param {resultPost1} - html element where address input is placed if valid

 */
function getTown(){
    var postCode =document.getElementById("adressInput").value
    const url = "https://api.postcodes.io/postcodes/"+postCode
    async function gettheTown(url_1) {
      const response = await fetch(url);
      var data = await response.json();
          console.log(data);
      result = data
     console.log(result.result.admin_ward)
     document.getElementById("resultTown").innerHTML=result.result.admin_ward
      var resultPost1 = document.getElementById("resultTown").innerHTML;
      console.log(resultPost1);

      
      }
    
  
    gettheTown(url);
  
  }

function reset() {
    document.getElementById("adressInput").value="";
    document.getElementById("result1").value="";
}


 

  /*
 let allPostCodes =[];
  const checkPost = document.getElementById(adressInput);
  checkPost.addEventListener("change",(event)=>{
    ;

  })
  */
  
 