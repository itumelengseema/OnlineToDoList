const btnSave = document.getElementById("Save")
const btnSReload = document.getElementById("btn-Reset")

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

function EditItem()
{
    const lblunfeed = document.getElementById("lblunFeedback")
    const lblpassfeed = document.getElementById("lbpaFeedback")
    const lblrepassfeed = document.getElementById("lbrepaFeedback")

     if(txtTitle.value === "")
    {
        lblunfeed.innerHTML = "Empty Title"
        lblunfeed.style.color = "red"
    }
    else{
        lblunfeed.innerHTML = ""
    }

    if(txtDesc.value === "")
    {
        lblpassfeed.innerHTML = "Empty Description"
        lblpassfeed.style.color = "red"
    }
    else{
        lblpassfeed.innerHTML = ""
    }

    if(txtDate.value === "")
    {
        lblrepassfeed.innerHTML = "Empty Due Date"
        lblrepassfeed.style.color = "red"
    }
    else{
        lblrepassfeed.innerHTML = ""
    }

    anItem.userid = LoggedUser;
    anItem.Title = txtTitle.value;
    anItem.Description = txtDesc.value;
    anItem.Date = txtDate.value;
    anItem.id = itemId;

    Items = [];
    Items = JSON.parse(localStorage.getItem("Items"))

    for(item of Items){
        
        if(item.id == itemId)
        {
            newItems.push(anItem);
        }
        else
        {
            newItems.push(item)
        }
    }

    localStorage.setItem("Items", JSON.stringify(newItems))
  
    div.style.background = "rgb(75, 180, 54)";

    pgHeader.innerHTML = "Saved successfully"
    
    setTimeout(() => {
        div.style.background = "white";
        pgHeader.innerHTML = "New Item"

        window.location.replace("home.html");
    }, 4000);

    fClear(txtTitle, txtDesc, txtDate);
}

function fClear(txtTitle, txtDesc, txtDate)
{
    txtTitle.value = "";
    txtDesc.value = "";
    txtDate.value = "";
}

btnSave.addEventListener("click", EditItem)
btnSReload.addEventListener("click", () => {
    window.location.reload();
})

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

            itemId = Number(id.split("edit-")[1]);

            if(item.id == itemId)
            {
                txtTitle.value = item.Title
                txtDesc.value = item.Description
                txtDate.value = item.Date

                txtDate.setAttribute('min', item.Date)

                break;
            }
        }
    }

    fgetSystemTime();
})