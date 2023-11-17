const btnLogin = document.getElementById("btnLogin")
let lsUser = [];
let aUser = {};

// import { getDatabase } from "firebase/database";

// const database = getDatabase();

lblTime = document.getElementById("txtTime");

function Login()
{
    const txtusername = document.getElementById("txtlogin-username")
    const txtpassword = document.getElementById("txtlogin-password")


    const lblunfeed = document.getElementById("lblunFeedback")
    const lblpassfeed = document.getElementById("lbpaFeedback")

     if(txtusername.value === "")
    {
        lblunfeed.innerHTML = "Empty username"
        lblunfeed.style.color = "red"

        return false;
    }
    else{
        lblunfeed.innerHTML = ""
    }

    if(txtpassword.value === "")
    {
        lblpassfeed.innerHTML = "Empty password"
        lblpassfeed.style.color = "red"

        return false;
    }
    else{
        lblpassfeed.innerHTML = ""
    }

    firebase
    .database()
    .ref("users/" + txtusername.value + "/LoginDetails")
    .on("value", function (snap) {

        if(snap.val()){

            if(snap.val().password === txtpassword.value){
                  sessionStorage.clear();
                  sessionStorage.setItem("LoggedUser", txtusername.value)
                 
                  if(snap.val().role === "Admin"){
                    window.location.replace("AdminHome.html")
                  }
                  else{
                    window.location.replace("home.html")
                  }
                  
            }
            else{
                alert("Incorrect password")
            }
        }
        else{
            alert("User not found")
        }
    });

        // lsUser = JSON.parse(localStorage.getItem("Users"))

        // let userFound = false;

        // let founduser ={};

        // if(lsUser !== null)
        // {
        //     for (aUserobj of lsUser)
        //     {

        //         if(aUserobj.username === txtusername.value && aUserobj.password === txtpassword.value )
        //         {
        //             userFound = true;
        //             founduser = aUserobj;
        //             break;
        //         }
        //     }
        // }
        

        // if(userFound){
        //     sessionStorage.clear();
        //     sessionStorage.setItem("LoggedUser", founduser.id)
        //     window.location.replace("home.html")
        // }
        // else {
        //    alert("User doesn't exist")

        // }

    // }
}

function fclear(txtusername, txtpassword)
{
    txtusername.value = "";
    txtpassword.value = "";
    lsUser = [];
}

btnLogin.addEventListener("click", Login)

function fgetSystemTime(){
    setInterval(() => {
        const dt_date = new Date()

        let hour = dt_date.getHours();
        let min = dt_date.getMinutes();
        let sec = dt_date.getSeconds();

        if(hour < 10)
        {
            hour = "0" + hour;
        }

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

window.addEventListener("DOMContentLoaded", () =>{
       fgetSystemTime()
})

