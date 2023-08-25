const btnUpdate = document.getElementById("btnSubm")
const div = document.querySelector(".main-back")
const pgHeader = document.querySelector(".lbl-new-item")
let LoggedUser;

let users = [];
const txtusername = document.getElementById("txtUsername")
const txtpassword = document.getElementById("txtPassword")
const txtrepassword = document.getElementById("txtRePassword")

lblTime = document.getElementById("txtTime");


function UpdateProfile()
{
    const lblunfeed = document.getElementById("lblunFeedback")
    const lblpassfeed = document.getElementById("lbpaFeedback")
    const lblrepassfeed = document.getElementById("lbrepaFeedback")

     if(txtusername.value === "")
    {
        lblunfeed.innerHTML = "Empty username"
        lblunfeed.style.color = "red"

        return
    }
    else{
        lblunfeed.innerHTML = ""
    }

    if(txtpassword.value === "")
    {
        lblpassfeed.innerHTML = "Empty password"
        lblpassfeed.style.color = "red"

        return
    }
    else{
        lblpassfeed.innerHTML = ""
    }

    if(txtrepassword.value === "")
    {
        lblrepassfeed.innerHTML = "Retype password"
        lblrepassfeed.style.color = "red"

        return
    }
    else{
        lblrepassfeed.innerHTML = ""
    }

    if(txtrepassword.value !== txtpassword.value || txtrepassword.value === "" || txtpassword.value === "")
    {
        lblrepassfeed.innerHTML = "Passwords don't match"
        lblrepassfeed.style.color = "red"


        lblpassfeed.innerHTML = "Passwords don't match"
        lblpassfeed.style.color = "red"

        return
    }
    else{
        lblrepassfeed.innerHTML = ""
        lblpassfeed.innerHTML = ""
    }


    let oldUsers = [];
    let newUsers = [];
    let aUser = {};

    aUser.id = LoggedUser;
    aUser.username = txtusername.value;
    aUser.password = txtpassword.value;

    oldUsers = JSON.parse(localStorage.getItem("Users"))

    for(user of oldUsers){
        // alert(typeof(LoggedUser))

        if(user.id == LoggedUser)
        {
            newUsers.push(aUser);
        }
        else
        {
            newUsers.push(user)
        }
    }

    localStorage.setItem("Users", JSON.stringify(newUsers))

    div.style.background = "rgb(75, 180, 54)";

    pgHeader.innerHTML = "Profile Update"

    setTimeout(() => {
        div.style.background = "coral";
        window.location.replace("home.html")
    }, 2000);

}

btnUpdate.addEventListener("click", UpdateProfile)

function fgetSystemTime(){
    setInterval(() => {
        const dt_date = new Date()
        const hour = dt_date.getHours();
        
        let min = dt_date.getMinutes();
        let sec = dt_date.getSeconds();

        if(min < 10)
        {
            min = "0" + min;
        }

        if(sec < 10)
        {
            sec = "0" + sec;
        }

        const displayTime = hour + ":" + min + ":" + sec;

        lblTime.innerHTML = displayTime;
    }, 1000)
}

window.addEventListener("DOMContentLoaded", () => {

    fgetSystemTime()

    if(sessionStorage.getItem("LoggedUser") === null)
    {
        window.location.replace("UnauthorizedAccess.html");
    }
    else{
        LoggedUser = sessionStorage.getItem("LoggedUser")

        users = JSON.parse(localStorage.getItem("Users"))

        for(user of users){
            // alert(typeof(LoggedUser))

            if(user.id == LoggedUser)
            {
                txtusername.value = user.username
                txtpassword.value = user.password
                break;
            }
        }
    }
})