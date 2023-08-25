const btnReg = document.getElementById("btnRegister")
const div = document.querySelector(".main-back")
const pgHeader = document.querySelector(".lbl-new-item")

lblTime = document.getElementById("txtTime");

let lsUser = [];
let aUser = {};

function Register()
{
    let txtusername = document.getElementById("txtregUsername")
    let txtpassword = document.getElementById("txtregPassword")
    let txtrepassword = document.getElementById("txtRePassword")

    const lblunfeed = document.getElementById("lblunFeedback")
    const lblpassfeed = document.getElementById("lbpaFeedback")
    const lblrepassfeed = document.getElementById("lbrepaFeedback")

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

    if(txtrepassword.value === "")
    {
        lblrepassfeed.innerHTML = "Retype password"
        lblrepassfeed.style.color = "red"

        return false
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

        return false;
    }
    else {
        lblrepassfeed.innerHTML = ""
        lblpassfeed.innerHTML = ""
    }

    if(localStorage.length === 0) {

        aUser.id = lsUser.length + 1;
        aUser.username = txtusername.value;
        aUser.password = txtpassword.value;

        lsUser.push(aUser);

        localStorage.setItem("Users", JSON.stringify(lsUser));

        fclear(txtusername, txtpassword, txtrepassword)
    }
    else
    {
        lsUser = JSON.parse(localStorage.getItem("Users"))

        aUser.id = lsUser.length + 1;
        aUser.username = txtusername.value;
        aUser.password = txtpassword.value;

        let userFound = false;

        lsUser.map(user => { 
            if(user.username === aUser.username)
            {
                userFound = true;
            }
        });

        if(userFound) { 
            lblunfeed.innerHTML = "Username already exists"
            lblunfeed.style.color = "red"

            return false;
        }
        else {
            lsUser.push(aUser);
            localStorage.setItem("Users", JSON.stringify(lsUser));
            fclear(txtusername, txtpassword, txtrepassword);
        }
    }

    
      div.style.background = "rgb(75, 180, 54)";
  
    setTimeout(() => {
        div.style.background = "coral";
     
    }, 4000);
}

function fclear(txtusername, txtpassword, txtrepassword)
{
    txtusername.value = "";
    txtpassword.value = "";
    txtrepassword.value = "";
    lsUser = [];
}


btnReg.addEventListener("click", Register)

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
    fgetSystemTime();
})