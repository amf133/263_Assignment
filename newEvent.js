/* ================================================================================================================
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    JS file with Front-End functionality for creating a New EVENT.
    see HTML - NewEvent.HTML
    see PHP - NewEvent.php
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 =================================================================================================================*/

//GLOBALS
let clusters; //This is a list of clusters acquired from the database to populate dropdown
let rooms; //This is a list of rooms acquired from the Database to populate modal
let highlightedRooms = []; //This list has all the final highlighted rooms

//Get method to get all the clusters from the database and dynamically populate dropdown
$.get('getClusters.php', function (data) {
    clusters = JSON.parse(data);
    showClusters(); //Populate the clusters dropdown on page load.
    return;
});

//Get method to get all the rooms from the database and dynamically populate dropdown
$.get('getRooms.php', function (data) {
    rooms = JSON.parse(data);
    showRooms();
    return;
});

//Function to Populate the clusters dropdown on page load.
//Listen for click event and call populateClusterBox to update the
function showClusters() {
    for (let i = 0; i < clusters.length; i++) {
        let dropdownMenu = document.getElementById("dropdownMenu");
        let clusterName = document.createElement('a')
        clusterName.innerHTML = "<button onclick='populateClusterBox(this.id)' id='" + clusters[i] + "' class='dropdown-item' type='button'>" + clusters[i] + "</button>"
        dropdownMenu.appendChild(clusterName);
    }
}

//Function to update the cluster dropDownName box when an option has been clicked
function populateClusterBox(str) {
    $("#clusterDropdownName").text(str);
    return;
}

//Function to show all the rooms dynamically
function showRooms() {
    for (let i=0; i < rooms.length; i++) {
        let listRoomsSection = document.getElementById("listRoomsSection");
        let roomName = document.createElement('a')
        roomName.innerHTML = "<a onclick='addSelectedRooms(this.id)' class='list-group-item list-group-item-action py-1' id='" + rooms[i] + "'>" + rooms[i] + "</a>";
        listRoomsSection.appendChild(roomName);
    }
}

//Function to highlight clicked selections when selecting rooms & and to create little tablets to show clicked rooms.
function addSelectedRooms(str) {
    //The list highlightedRooms is a global list that keeps track of all the rooms selected.

    //Check to make sure the room hasn't been selected already
    if (!(highlightedRooms.includes(str))) {
        highlightedRooms.push(str); //Add the room to the list of rooms.

        //highlight the clicked room green
        let roomName = document.getElementById(str);
        roomName.classList.add('list-group-item-success');

        //Add little tablets at the bottom of the page to show the selected rooms
        //let addedRooms = document.getElementById('addedRooms');
        let addedRooms = document.getElementById('addedRooms')
        let addedRoomButton = document.createElement('a');
        addedRoomButton.setAttribute('id', str+"buttonGroupID");
        addedRoomButton.innerHTML = "<span id='" + str + 'badgeID' + "' class='badge badge-danger'>" + str + "</span> ";
        addedRooms.appendChild(addedRoomButton);
        return;
    } else {
        //Remove the item from the highlightedRooms List
        let strIndex = highlightedRooms.indexOf(str);
        highlightedRooms.splice(strIndex, 1);

        //Undo the highlighted selection.
        let roomName = document.getElementById(str);
        roomName.classList.remove('list-group-item-success');

        //Remove the little room tablet at the bottom
        let addedRooms = document.getElementById('addedRooms')
        let buttonGroupID = document.getElementById(str+"buttonGroupID");
        let addedRoomButton = document.getElementById(str + "badgeID");
        buttonGroupID.removeChild(addedRoomButton);
        addedRooms.removeChild(buttonGroupID);
        return;

    }

}

//listen for click on create new event button
$("#createNewEventButton").click(function() {
    createNewEvent();
});

//Function to gather all entered details, do error checks and send to PHP via jQuery post function
function createNewEvent() {
    //collect all the new event details
    let eventName = document.getElementById("eventName").value;
    let eventCluster = document.getElementById("clusterDropdownName").innerHTML;
    let eventDate = document.getElementById("dateField").value;
    let eventStartTime = document.getElementById("startTimeField").value;
    let eventEndTime = document.getElementById("endTimeField").value;
    let eventTimeOffset = document.getElementById("timeOffset").value;
    //highlightedRooms list is global

    //Error checks for Creation of new date.

    if (eventName === null || eventName === "") {
        alert("Event name required");
        return;
    }

    if (!(clusters.includes(eventCluster))) {
        alert("Please select a cluster");
        return;
    }

    if (eventDate === "" || eventDate === null) {
        alert("Valid date required");
        return;
    }

    let today = new Date();
    if (today > Date.parse(eventDate)) {
        alert("Date must either be today or in the future");
        return;
    }

    if (eventStartTime === "" || eventEndTime === "" || eventTimeOffset === "") {
        alert("Please enter all event timing details");
        return;
    }


    if (highlightedRooms.length === 0) {
        alert("Please select rooms");
        return;
    }

    //create a JSON object from the given data
    let sendData = JSON.parse('{"event_name": "' + eventName + '", "date": "' + eventDate + '", "groups": "' +
        highlightedRooms.join() + '", "start_time": "' + eventStartTime + '", "finish_time": "' + eventEndTime +
        '", "cluster": "' + eventCluster + '"}');

    //send data to the php file to process
    $.post( "NewEvent.php", { sendData })
        .done(function( data ) {
            alert( "Data Loaded: " + data );
            if (data === "Success!") {
                window.location.href = 'viewEvents.html';
            }
        });
}

function logout() {
    document.cookie = "admin=; expires=Fri, 1 Jan 1960 23:59:59 GMT";
    window.location.href = './index.html';
}

