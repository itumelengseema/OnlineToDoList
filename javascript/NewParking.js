const btnSave = document.getElementById("Save")
const div = document.querySelector(".main-back")
const pgHeader = document.querySelector(".lbl-new-item")
let anItem = {}
let Items = [];

const txtOwner = document.getElementById("txtOwner")

const txtProvince = document.getElementById("txtProvince")
let LoggedUser;

function AddNew()
{
     if(txtOwner.value === "")
    {
        alert("Missing Details");

        return;
    }
    else if(txtProvince.value === "")
    {
        alert("Missing Details");
        return
    }

    firebase.database().ref('BookingPlaces/' + txtProvince.value + "/" + txtOwner.value).set(
        txtOwner.value).then(() => {
            div.style.background = "rgb(75, 180, 54)";

            pgHeader.innerHTML = "Saved successfully"
            
            setTimeout(() => {
                div.style.background = "white";
                pgHeader.innerHTML = "New Item"
            }, 4000);
            txtOwner.value = ""
      }).catch(err =>{
        alert(err)
      });
        // fClearFleids(txtTitle, txtDesc, txtDate);
}

function fClearFleids(txtTitle, txtDesc, txtDate)
{
    // txtTitle.value = "";
    // txtDesc.value = "";
    // txtDate.value = "";
    // txtDate.valueAsDate = new Date();
}

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
        txtTime.innerHTML = displayTime;
    }, 1000)
}

window.addEventListener("DOMContentLoaded", () =>{

    fgetSystemTime()

    if(sessionStorage.getItem("LoggedUser") === null)
    {
        window.location.replace("UnauthorizedAccess.html");
    }
    else
    {
        LoggedUser = sessionStorage.getItem("LoggedUser")

        // const dtToday = new Date();
    
        // let month = dtToday.getMonth() + 1;
        // let day = dtToday.getDate();
        // const year = dtToday.getFullYear();

        // if(month < 10)
        // {
        //     month = '0' + month.toString();
        // }
            
        // if(day < 10){
        //     day = '0' + day.toString();
        // }
            
        
        // let maxDate = year + '-' + month + '-' + day;
    
        // or instead:
        // var maxDate = dtToday.toISOString().substr(0, 10);
    
        // txtDate.setAttribute('min', maxDate);
    }
})

btnSave.addEventListener("click", AddNew)