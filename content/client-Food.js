(function (){
    //bsj5 - Adding in client side to display 
    //This is to get filter condition
    function getResult() {
        let filRating = document.getElementById("selrating").value
        let filTime = document.getElementById("selectDate").value
        fetch(`/holidayEvents/Food/${filRating}/${filTime}`)
        .then(res => res.json())
        .then(jsn => {displayFoodEvents(jsn)})
    }

    //BEACH
    function getFoodEvents(){
        fetch(`/holidayEvents/Food`)
        .then (res => res.json())
        .then (jsn => displayFoodEvents( jsn))
    }
    
    var pCount = 0
    function displayFoodEvents(foods){
        pCount = 0
        // console.log(foods)
        let foodEvents = document.getElementById("foodEvents");
        foodEvents.innerHTML = "";
        for(food of foods) {
            let idFood = food._id
            let div = document.createElement("div")
            div.value = food.id
           // div.class = "postTest"
           div.className = "postTest";
            let img = document.createElement("img");
            img.setAttribute("src", food.src);
            img.setAttribute("style", "align-items: center");
            img.setAttribute("width", "200");
            div.appendChild(img);
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let p3 = document.createElement("p")
            let p4 = document.createElement("p")
            p1.innerHTML = food.name 
            p2.innerHTML = food.rating
            p3.innerHTML = food.location
            p4.innerHTML = food.transportation
            let btn1 = document.createElement("button")//ht61 button
            btn1.setAttribute("value", idFood)
            btn1.setAttribute("id", `view${pCount}`)
            btn1.innerHTML = "view"
            btn1.onclick = viewPost
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(p3);
            div.appendChild(p4);
            div.appendChild(btn1);
            foodEvents.appendChild(div);
            
            
        }
        pCount += 1
    }

///WHEN CLICK ON ONE POST,HIDE ALL AND DISPLAY THIS ONE WITH COMMENTS///
//main function
var viewPost = async function (A) {
    let postid = A.target.value
    // console.log(A.target.value)
    document.getElementById("showposts").style.display = "none"//hide other part
    document.getElementById("viewPost").style.display = "block"//show the post clicked
    fetch(`/holidayPost/${postid}`)//first fetch to get Post
        .then(res => res.json())
        .then(jsn => postOne(jsn))//show the post
        .then(() => {
            fetch(`/holidayComments/${postid}`)//then fetch relative comments
                .then(res => res.json())
                .then(jsn => {postComment(jsn)})
        }
        )

}

//display this post
var thisPostid=""
var postOne=function(post){
    // console.log(post)
    thisPostid=post[0]._id
    document.getElementById("postName").innerHTML=post[0].name;
    document.getElementById("postRating").innerHTML="It deserves " + post[0].rating + "!";
    document.getElementById("postType").innerHTML="Type: " + post[0].type;
    document.getElementById("postComment").innerHTML="I think: " + post[0].comment;
    document.getElementById("postLocation").innerHTML="Location: " + post[0].location;
    document.getElementById("postTransportation").innerHTML="How I Got There: " + post[0].transportation;
    document.getElementById("postDate").innerHTML="Date Uploaded: " + post[0].date;
    document.getElementById("postUsername").innerHTML="Author: " + post[0].username;

    let postImage = document.createElement("img");
    postImage.setAttribute("src",post[0].src);
    postImage.setAttribute("style","float:right");
    postImage.setAttribute("width","50%");
    postImage.setAttribute("class","rounded float-end");
    document.getElementById("postImg").appendChild(postImage);
    
    }

//display related comments
var postComment=function(comments){
    // console.log(comments)
    let postComments = document.getElementById("postComments")
    for (comment of comments) {
    let divCard = document.createElement("div");
    let divHeader = document.createElement("div");
    let divBody = document.createElement("div");
    divCard.setAttribute("class","card");
    divHeader.setAttribute("class","card-header")
    divBody.setAttribute("class","cardBody");
    divHeader.innerHTML=comment.username+ " Comment time: " + comment.comdate;
    divBody.innerHTML=comment.comment;
    divCard.appendChild(divHeader);
    divCard.appendChild(divBody);
    postComments.appendChild(divCard);
    }
}

//get comment content
var makeComment=function(){
let comment=document.getElementById("newcomment").value
let usefulmark=document.getElementById("postrating").value
let comdate=new Date
let username=localStorage.getItem("thisUser")
return newPost={
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({postid:thisPostid,username:username,comment:comment,comdate:comdate.toLocaleDateString(),usefulmark:usefulmark})
}
}

//fetch to serverside
var addComment=function(){
let newComment=makeComment()
fetch('/addcomments', newComment)
.then (res => res.text())
.then (txt => {alert(txt);clearCom()})
}

var clearCom=function(){
document.getElementById("newcomment").value=""
document.getElementById("postrating").value=""
}

getFoodEvents();
document.getElementById("filterBtn").onclick = getResult
document.getElementById("com-submit").onclick=addComment

    
})();