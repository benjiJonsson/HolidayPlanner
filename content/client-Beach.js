(function () {
    //bsj5 - Adding in client side to display 

    ///HT61 & bsj5: HERE IS TO FILTER
    //This is to get filter condition
    //send condition data to serverside, clear original section and show new data
    function getResult() {
        let filRating = document.getElementById("selrating").value
        let filTime = document.getElementById("selectDate").value
        fetch(`/holidayEvents/Beach/${filRating}/${filTime}`)
            .then(res => res.json())
            .then(jsn => { displayBeachEvents(jsn) })
    }

    //BEACH
    function getBeachEvents() {
        fetch(`/holidayEvents/Beach`)
            .then(res => res.json())
            .then(jsn => { displayBeachEvents(jsn) })
    }
    //Function to display beach events to html 
    var pCount = 0
    function displayBeachEvents(beaches) {
        pCount = 0
        // console.log(beaches)
        let beachEvents = document.getElementById("beachEvents");
        beachEvents.innerHTML = "";
        //beachEvents.innerHTML = "";
        for (beach of beaches) {
            let idBeach = beach._id
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
            let btn1 = document.createElement("button")//ht61 button
            btn1.setAttribute("value", idBeach)
            btn1.setAttribute("id", `view${pCount}`)
            btn1.innerHTML = "view"
            btn1.onclick = viewPost
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(p3);
            div.appendChild(p4);
            div.appendChild(btn1);
            beachEvents.appendChild(div);
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
                    .then(jsn => { postComment(jsn) })
            }
            )

    }

    //display this post
    //still have error when want to view a new post
    var thisPostid = ""
    var postOne = function (post) {
        // console.log(post)
        thisPostid = post[0]._id
        // document.getElementById("thisPost").innerHTML=post[0]._id+post[0].name+post[0].username
        document.getElementById("pname").innerHTML = post[0].name
        document.getElementById("prating").innerHTML = "It deserves " + post[0].rating + " !"
        document.getElementById("ptype").innerHTML = "Type: " + post[0].type
        document.getElementById("pcomment").innerHTML = "I think: " + post[0].comment
        document.getElementById("plocation").innerHTML = "Location: " + post[0].location
        document.getElementById("ptransportation").innerHTML = "How I Got There: " + post[0].transportation
        document.getElementById("ptime").innerHTML = "Upload time: " + post[0].date
        document.getElementById("pusername").innerHTML = "Author: " + post[0].username

        let img1 = document.createElement("img");
        img1.setAttribute("src", post[0].src);
        img1.setAttribute("style", "float: right");
        img1.setAttribute("width", "50%");
        img1.setAttribute("class","rounded float-end")
        document.getElementById("postImg").appendChild(img1)
    }

    //display related comments
    var postComment = function (comments) {
        // console.log(comments)
        let pComments = document.getElementById("pcomments")
        for (comment of comments) {
            // document.getElementById("thisComments").innerHTML+=comment.username+": "+comment.comment+"."+" Comment was made on: " +comment.comdate 
            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            let div3 = document.createElement("div")
            div1.setAttribute("class", "card")
            div2.setAttribute("class", "card-header")
            div3.setAttribute("class", "card-body")
            div2.innerHTML = comment.username + " Comment time: " + comment.comdate
            div3.innerHTML = comment.comment
            div1.appendChild(div2)
            div1.appendChild(div3)
            pComments.appendChild(div1)
        }
    }

    //get comment content
    var makeComment = function () {
        let comment = document.getElementById("newcomment").value
        let usefulmark = document.getElementById("postrating").value
        let comdate = new Date
        let username = localStorage.getItem("thisUser")
        return newPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postid: thisPostid, username: username, comment: comment, comdate: comdate.toLocaleDateString(), usefulmark: usefulmark })
        }
    }

    //fetch to serverside
    var addComment = function () {
        let newComment = makeComment()
        fetch('/addcomments', newComment)
            .then(res => res.text())
            .then(txt => { alert(txt); clearCom() })
    }

    var clearCom = function () {
        document.getElementById("newcomment").value = ""
        document.getElementById("postrating").value = ""
    }


    document.getElementById("filterBtn").onclick = getResult
    getBeachEvents();
    document.getElementById("com-submit").onclick = addComment
    document.getElementById("clearcom").onclick = clearCom
    // document.getElementById("clearcom").oncancel

})();