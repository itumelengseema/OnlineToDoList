let LoggedUser;
let UsersItems = [];
let LoggedUserItems = []
let aItem = {};

let rowCount = 0;

const table = document.getElementById("tblItems");
const tableBody = document.getElementById("tblTbody");
const txtSearch = document.getElementById("txtSearch");

lblTime = document.getElementById("txtTime");

function ViewItem(element)
{
    window.location.replace(`ViewItem.html?id=${element.id}`);
}

function DeleteItem(element){

    if(confirm("You sure you want to delete this Item?"))
    {
        LoggedUser = sessionStorage.getItem("LoggedUser")
        
        if(localStorage.getItem("Items") !== null)
        {
            LoggedUserItems = []
            UsersItems = JSON.parse(localStorage.getItem("Items"))

            for(Useritems of UsersItems)
            {
                if(Useritems.userid == LoggedUser)
                {
                    LoggedUserItems.push(Useritems);
                }
            }

            newListItems = []

            for(Useritems of UsersItems)
            {
                const elId = element.id

                if(Useritems.id != Number(elId.split("delete-")[1]))
                {
                    
                    newListItems.push(Useritems)
                }
            }

            localStorage.setItem("Items", JSON.stringify(newListItems))
        }
    }

    location.reload();
}

function EditItem(element)
{
    window.location.replace(`editItem.html?id=${element.id}`);
}

function Search()
{

   for(i = 0; i <= table.rows.length; i++) {

    if(table.rows.length != 1)
    {
        table.deleteRow(1);
    }

   }

    const tb = document.createElement("tr")

        LoggedUser = sessionStorage.getItem("LoggedUser")
        const lens = JSON.parse(localStorage.getItem("Items"))
        
        if(localStorage.getItem("Items") !== null)
        {
            
            UsersItems = JSON.parse(localStorage.getItem("Items"))
            LoggedUserItems = []

            for(Useritems of UsersItems)
            {
                if(Useritems.userid == LoggedUser)
                {
                    LoggedUserItems.push(Useritems);
                }
            }

            rowCount = 0;

            for(item of LoggedUserItems.reverse())
            {

                if(item.Title.includes(txtSearch.value)){
                    fGenerateTable(item)
                }
            }
            
            table.appendChild(tableBody)
        }
}

function fGenerateTable(item) {
    
    let rowID;
    const row = document.createElement("tr")

    rowCount++;

    for(let i = 0; i < Object.keys(item).length; i++)
    {
    
        if(Object.keys(item)[i] !== "id")
        {
            const cell = document.createElement("td")

            let cellData;
        
            if(Object.keys(item)[i] === "userid") 
            {
                cellData = document.createTextNode(`${rowCount}`)
            }
            else
            {
                if(Object.keys(item)[i] !== "Date")
                {
                    cellData = document.createTextNode(`${item[Object.keys(item)[i]].substring(0, 8)} ...`)
                }
                else{
                    cellData = document.createTextNode(`${item[Object.keys(item)[i]]}`)
                }
            }
            
            cell.appendChild(cellData);
            row.appendChild(cell);
        } 
        else {
            rowID = `${item[Object.keys(item)[i]]}`
        }
    }

    const cellactions = document.createElement("td")

    const div = document.createElement("div")
    div.classList.add("icons");

    const im1 = document.createElement("img")

    im1.src = "../images/eye.png"
    im1.setAttribute("id", "view-" + rowID)
    im1.addEventListener("click", () =>{ViewItem(im1)});

    const im2 = document.createElement("img")
    im2.src = "../images/pencil.png"
    im2.setAttribute("id", "edit-" + rowID)
    im2.addEventListener("click", () =>{EditItem(im2)});

    const im3 = document.createElement("img")
    im3.src = "../images/delete (1).png"
    im3.setAttribute("id", "delete-" + rowID)
    im3.addEventListener("click", () =>{DeleteItem(im3)});

    div.appendChild(im1)
    div.appendChild(im2)
    div.appendChild(im3)

    cellactions.appendChild(div)
    row.appendChild(cellactions)

    tableBody.appendChild(row);
}

txtSearch.addEventListener("search", Search)

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

    if(sessionStorage.getItem("LoggedUser") === null)
    {
        window.location.replace("UnauthorizedAccess.html");
    }
    else{

        LoggedUser = sessionStorage.getItem("LoggedUser")
        const lens = JSON.parse(localStorage.getItem("Items"))
        
        if(localStorage.getItem("Items") !== null)
        {
            
            UsersItems = JSON.parse(localStorage.getItem("Items"))

            for(Useritems of UsersItems)
            {
                if(Useritems.userid == LoggedUser)
                {
                    LoggedUserItems.push(Useritems);
                }
            }

            for(item of LoggedUserItems.reverse())
            {
                fGenerateTable(item)
                // table.appendChild(tableBody)
                
            }
        }
    }
})