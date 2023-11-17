let LoggedUser;
let UsersItems = [];
let LoggedUserItems = []
let aItem = {};

let rowCount = 0;

const table = document.getElementById("tblItems");
const tableBody = document.getElementById("tblTbody");
const txtSearch = document.getElementById("txtSearch");
const notifications = document.querySelector(".dropdown-content")
const notiImg = document.querySelector(".dropbtn")

lblTime = document.getElementById("txtTime");
let e;
function DeleteItem(){

    e = e || window.event;

    province = (e.target.id).split("/")[0]
    spot = (e.target.id).split("/")[1]

    if(confirm("You sure you want to delete this spot '" + spot + "'?"))
    {
        LoggedUser = sessionStorage.getItem("LoggedUser")
        
            firebase
            .database()
            .ref('BookingPlaces/' + province + '/' + spot)
            .remove().then(() => {
                alert("removed")
                location.reload();
            }).catch(err => {
                alert(err)
            })
    }
    else{
        e = ""
    }

    
}

function EditItem(element)
{
    window.location.replace(`editItem.html?id=${element.id}`);
}


let notiItem = '';

function fGenerateTable() {
    
    let rowID;
    // const row = document.createElement("tr")

    // rowCount++;
    const table = document.querySelector(".park-holder");

    let builder = "";
    firebase
    .database()
    .ref("BookingPlaces")
    .on("value", function (snap) {
        
        snap.forEach(element => {
            builder += `<label>${element.key}</label>`;
            builder += `
            <div class="parking-items">`;
            element.forEach( sna => {
                builder += `
                    <div class="parking" id="${element.key}/${sna.val()}" onclick="DeleteItem(e)">
                        <label>${sna.val()}</label>
                    </div>`
            })
            
            builder += `
            </div>`;
            table.innerHTML = builder;
        });

    });
    
    // firebase
    // .database()
    // .ref("users/" + LoggedUser+"/Bookings")
    // .on("value", function (snap) {

    //     snap.forEach(element => {

    //         let key = "";
    //         dataK = ""

    //         const row = document.createElement("tr")

    //         element.forEach((data) => {
    //         const cell = document.createElement("td")
    //             let cellData;

    //             if(data.key === "Parking"){
    //                 key = data;
    //                 dataK = element.key;
    //             }
    
    //             cellData = document.createTextNode(`${data.val()}`)
    //             cell.appendChild(cellData);
    //             row.appendChild(cell);
    //         })

    //         const cellactions = document.createElement("td")

    // const div = document.createElement("div")
    // div.classList.add("icons");

    // const im3 = document.createElement("img")
    // im3.src = "./images/delete (1).png"
    // im3.setAttribute("id", dataK + "/" + key.val())
    // im3.addEventListener("click", () =>{DeleteItem(im3)});
 
    // div.appendChild(im3)

    // cellactions.appendChild(div)
    // row.appendChild(cellactions)

    // tableBody.appendChild(row);
    //     });
    // });

    
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
        lblTime.innerHTML = displayTime;
    }, 1000)
}

function fTodayDate()
{
    const DateDt = new Date().toLocaleDateString();
        
        const NewDate = DateDt.split("/")


        let dayD = NewDate[0]
        let monD = NewDate[1]
        if(NewDate[0] < 10)
        {
            dayD = "0" + NewDate[0]
        }

        if(NewDate[1] < 10)
        {
            monD = "0" + NewDate[1]
        }
        const dt = NewDate[NewDate.length - 1] + "-" + dayD + "-" + monD
    
        return dt;
}

window.addEventListener("DOMContentLoaded", () =>{

    fgetSystemTime()

    if(sessionStorage.getItem("LoggedUser") === null)
    {
        window.location.replace("UnauthorizedAccess.html");
    }
    else{

        LoggedUser = sessionStorage.getItem("LoggedUser")
        fGenerateTable()
    }
})