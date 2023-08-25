const div = document.querySelector(".main-back")
const pgHeader = document.querySelector(".lbl-new-item")

lblTime = document.getElementById("txtTime");

let LoggedUser;
let Items = [];
let newItems = [];

let anItem = {};

let itemId;

    const txtTitle = document.getElementById("txtTitle")
    const txtDesc = document.getElementById("txtDesc")
    const txtDate = document.getElementById("dtDate")

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

window.addEventListener("DOMContentLoaded", () => {

    fgetSystemTime()

    if(sessionStorage.getItem("LoggedUser") === null)
    {
        window.location.replace("UnauthorizedAccess.html");
    }
    else{
        LoggedUser = sessionStorage.getItem("LoggedUser")

        Items = JSON.parse(localStorage.getItem("Items"))

        for(item of Items){
            // alert(typeof(LoggedUser))

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id')

            itemId = Number(id.split("view-")[1]);

            if(item.id == itemId)
            {
                txtTitle.value = item.Title
                txtDesc.value = item.Description
                txtDate.value = item.Date

                break;
            }
        }
    }

    
})