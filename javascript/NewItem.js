const btnSave = document.getElementById("Save")
const div = document.querySelector(".main-back")
const pgHeader = document.querySelector(".lbl-new-item")
let anItem = {}
let Items = [];

const txtOwner = document.getElementById("txtOwner")
const txtContact = document.getElementById("txtContact")
const txtMake = document.getElementById("txtMake")

const txtModel = document.getElementById("txtModel")
const txtNumberPlate = document.getElementById("txtNumberPlate")

const txtProvince = document.getElementById("txtProvince")
const txtParking = document.getElementById("txtParking")

const txtTimeIn = document.getElementById("txtTimeIn")

const txtTimeOut = document.getElementById("txtTimeOut")

// lblTime = document.getElementById("txtTime");

let LoggedUser;

function AddNew()
{
     if(txtOwner.value === "")
    {
        alert("Missing Details");

        return;
    }
    else if(txtContact.value === "")
    {
        alert("Missing Details");

        return
    }
    else if(txtMake.value === "")
    {
        alert("Missing Details");
        return
    }
    else if(txtModel.value === "")
    {
        alert("Missing Details");
        return
    }
    else if(txtNumberPlate.value === "")
    {
        alert("Missing Details");

        return
    }
    else if(txtTimeIn.value === "")
    {
        alert("Missing Details");
        return
    }
    else if(txtParking.value === "")
    {
        alert("Missing Details");
        return
    }
    else if(txtProvince.value === "")
    {
        alert("Missing Details");
        return
    }
    else if(txtTimeOut.value === "")
    {
        alert("Missing Details");
        return
    }

    firebase.database().ref('users/' + LoggedUser + "/Bookings").push().set({
            Owner: txtOwner.value,
            Contact:txtContact.value,
            Make:txtMake.value,
            Model:txtModel.value,
            NumberPlate:txtNumberPlate.value,
            TimeIn:txtTimeIn.value,
            Timeout:txtTimeOut.value,
            Province:txtProvince.value,
            Parking: txtParking.value
      }).then(() =>{

        bpla = (txtParking.value).split("-")
        firebase
        .database()
        .ref('BookingPlaces/' + bpla[0] + '/' + bpla[1])
        .remove().then(() => {
            alert("SAVED")
            location.reload();
        }).catch(err => {
            alert(err)
        })
      }).catch(err =>{
        alert(err)
      });
    

        div.style.background = "rgb(75, 180, 54)";

        pgHeader.innerHTML = "Saved successfully"
        
        setTimeout(() => {
            div.style.background = "white";
            pgHeader.innerHTML = "New Item"
        }, 4000);

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

        txtOwner.value = LoggedUser;

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
txtProvince.addEventListener('change', () => {
    firebase
    .database()
    .ref("BookingPlaces/" + txtProvince.value)
    .on("value", function (snap) {
        let name = "";
        snap.forEach(element => {
            name += `<option value="${snap.key}-${element.val()}">${snap.key} - ${element.val()}</option>`
        });

        txtParking.innerHTML = name;
    });
})