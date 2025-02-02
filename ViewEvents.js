/*======================================================================================================================
Filename: ViewEvents.js
Description: get details from ViewEvents.php. If on the ViewEvents.html page, this will populate the table otherwise on
index.html this will update the counters. This file also stores logic for the search bar, filtering by status of event

Authors:
Simon Lorimer
Alec Fox
Sean Madondo
Josiah Thorpe
======================================================================================================================*/

let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) { //get echo from ViewEvents.php
    searchData = sortData(JSON.parse(data)); //sort the data (check sortData function for format)
    if (document.getElementById('events')) { //if on ViewEvents.html page, then populate table
        showResult("");
    } else if (document.getElementById('upcomingEvents')) { //if on home page, populate dynamic count of each event
        dynamicHomeDisplay(); //populates main display on homepage
    }
    return;
});


function dynamicHomeDisplay() { //main function for index.html counter elements
    var upcomingEvents = 0;
    var inProgressEvents = 0;
    var completeEvents = 0;

    //search events, check status and add whichever one to counter
    for (let i = 0; i < searchData.length; i++) {
        let status = searchData[i][7];
        if (status == "Complete") {
            completeEvents += 1;
        }  else if (status === "Upcoming") {
            upcomingEvents += 1;
        } else {
            inProgressEvents += 1;
        }
    }

    //update the counters
    document.getElementById('inProgressEvents').innerHTML = inProgressEvents;
    document.getElementById('upcomingEvents').innerHTML = upcomingEvents;
    document.getElementById('completeEvents').innerHTML = completeEvents;

    return;
}

function getTimes(event) { //returns startTime, finishTime and duration in a list from event details
    var startTime = event[0].time;

    var finishTime = event[event.length - 1].time;
    var duration = event[event.length -1].time_offset;

    return [startTime, finishTime, duration];
}

function getGroups(event) { //determines groups associated with event and returns in a String type list
    var groups = [];

    for (let i = 0; i < event.length; i++) {
        if (!groups.includes(event[i].machine_group)) {
            groups.push(event[i].machine_group);
        }
    }

    return groups;
}

function getStatus(eventDate, eventTimes) { //determines and returns status
    var startTimeDate = new Date(eventDate + " " + eventTimes[0]);
    var finishTimeDate = new Date(eventDate + " " + eventTimes[1]);

    if (Date.now() < startTimeDate) {
        return "Upcoming";

    } else if (Date.now() > finishTimeDate) {
        return "Complete";

    } else {
        return "In Progress";
    }
}

function sortData(searchData) { //this function will convert searchData into more consumable data

    var sortedData = []
    let keys = Object.keys(searchData);

    for (let i = 0; i < keys.length; i++) {
        let event = searchData[keys[i]];
        var eventName = event[0].event_name; //Event Name
        var eventDate = event[0].date; //Event Date
        var eventTimes = getTimes(event); //Event Time
        var eventGroups = getGroups(event); //Event Groups
        var eventStatus = getStatus(eventDate, eventTimes); //Event Status

        sortedData.push([keys[i], eventName, eventDate, eventTimes[0], eventTimes[1], eventTimes[2], eventGroups, eventStatus]);
    }

    return sortedData.sort(function(a,b){return b[2].localeCompare(a[2]);});
}

function showResult(str) {
    let div = document.getElementById("events");
    let filter = document.getElementById('filterByDropdown').innerHTML;

    var filterSet = false;
    //check filter is set to Upcoming, In Progress of Upcoming
    if (filter === "Complete" || filter === "In Progress" || filter === "Upcoming") {
        filterSet = true;
    }

    div.innerHTML = "<tr><th>Event Name</th><th>Date</th><th>Start Time</th><th>Finish Time</th><th>Status</th><th>Details</th></tr>";

    if (str.length === 0) {
        //show all results when nothing in search
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //get current event
            if (filterSet) {
                if (searchData[i][7] === filter) {
                    div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                        each[2] +"</td><td>" + each[3] + "</td><td>" +
                        each[4] + "</td><td>" + each[7] +
                        "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-outline-danger grow' data-toggle='modal' data-target='#eventsModal'><i class=\"fa fa-info\"></i></button></td></tr>"
                }
            } else {
                div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                    each[2] +"</td><td>" + each[3] + "</td><td>" +
                    each[4] + "</td><td>" + each[7] +
                    "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-outline-danger grow' data-toggle='modal' data-target='#eventsModal'><i class=\"fa fa-info\"></i></button></td></tr>"
            }
        }
    } else if (str.length >= 3) { //if 3 or more characters entered in search box
        //show results based off search based off event name
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //currently getting first result of each event, will display proper information once sortData is complete.
            if (each[1].toLowerCase().includes(str.toLowerCase())) {
                if (filterSet) {
                    if (searchData[i][7] == filter) {
                        div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                            each[2] +"</td><td>" + each[3] + "</td><td>" +
                            each[4] + "</td><td>" + each[7] +
                            "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-outline-danger grow' data-toggle='modal' data-target='#eventsModal'><i class=\"fa fa-info\"></i></button></td></tr>"
                    }
                } else {
                    div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                        each[2] +"</td><td>" + each[3] + "</td><td>" +
                        each[4] + "</td><td>" + each[7] +
                        "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-outline-danger grow' data-toggle='modal' data-target='#eventsModal'><i class=\"fa fa-info\"></i></button></td></tr>"
                }
            }
        }
    }
    return;
}

//Function control for filter by Dropdown
function filterBy(filterType) {
    document.getElementById('filterByDropdown').innerHTML = document.getElementById(filterType).innerHTML;
    showResult(document.getElementById('searchString').value);
    return;
}

function disableEvent(id) { //disable event
    console.log(id);

    //TODO: implement disable to disable all events where event_id = id

}

function findEvent(id) {
    for (let i = 0; i < searchData.length; i++) {
        if (id == searchData[i][0]) {
            return searchData[i];
        }
    }
}

function modalPopulate(id) { //populate the modal with more details

    var event = findEvent(id); //find list of elements with id that matches
    document.getElementById('eventTitle').innerHTML = "<h5>" + event[1] + "</h5>"; //title


    var description = document.getElementById('eventDescription'); //description

    description.innerHTML = "";
    description.innerHTML += "Event ID: " + id + "<br/>"; //event_id
    description.innerHTML += "Date: " + event[2] + "<br/><br/>"; //date
    description.innerHTML += "Start Time: " + event[3] + "<br/>"; //start time
    description.innerHTML += "Finish Time: " + event[4] + "<br/>"; //finish time
    description.innerHTML += "Duration: " + event[5] + "<br/><br/>"; //duration

    description.innerHTML += "Groups: <br/>"; //groups
    for (let i = 0; i < event[6].length; i++) {
        description.innerHTML += event[6][i] + "<br/>";
    }

    description.innerHTML += "<br/>Status: " + event[7] + "<br/>"; //status
}

function logout() { //deletes cookies and refers back to home page
    document.cookie = "admin=; expires=Fri, 1 Jan 1960 23:59:59 GMT";
    window.location.href = './index.html';
}




