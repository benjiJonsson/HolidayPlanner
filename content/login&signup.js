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
                alert("Login success! Welcome "+jsn.msg+" !")
                localStorage.setItem('thisUser',jsn.msg)
               })
}

function parseResponse(response) {
    // console.log(response)
    if (response.status == 401) {
        alert("login failed or logout.")
    } else {
        return response.json()
    }
}

//receive the res from server and alert the result of registration
// let queryParams = new URLSearchParams(location.search);
// if(queryParams.get('signupresult')){
//     console.log("getresult")
//     let thisResult=queryParams.get('signupresult')
//     if (thisResult== "success") {
//             alert("Sign up success! Please login.")}
//     // } else if(thisResult== "dupusername"){alert("Sign up failed, username duplicated.")}
//     // else if(thisResult== "nopsw"){alert("Sign up failed, please set the password.")}
//     // else if (thisResult== "failed") {
//     //     console.log('failed')
//     //     alert("Sorry, username duplicated.")
//     // }
// }





 //get comment content
 var getnewUser=function(){
    let username=document.getElementById("signup-username").value
    let psw=document.getElementById("signup-password").value
    return newUser={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:username,psw:psw})
    }
}

//fetch to serverside
var signUp=function(){
    let newUser=getnewUser()
    fetch('/userSignup', newUser)
    .then (res => res.text())
    .then (txt => {alert(txt)})
}


window.onload=()=>{
    document.getElementById("login").onclick=userLogin
    document.getElementById("signup-button")?document.getElementById("signup-button").onclick=signUp:null
}


