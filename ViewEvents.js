let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) {
    searchData = sortData(JSON.parse(data));
    if (document.getElementById('events')) {
        showResult("");
    } else if (document.getElementById('upcomingEvents')) { //if on home page, populate count of each event
        dynamicHomeDisplay(); //populates main display on homepage
    }
    return;
});


function dynamicHomeDisplay() {
    var upcomingEvents = 0;
    var inProgressEvents = 0;
    var completeEvents = 0;

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

    document.getElementById('inProgressEvents').innerHTML = inProgressEvents;
    document.getElementById('upcomingEvents').innerHTML = upcomingEvents;
    document.getElementById('completeEvents').innerHTML = completeEvents;

}

function getTimes(event) {
    var startTime = event[0].time;

    var finishTime = event[event.length - 1].time;
    var duration = event[event.length -1].time_offset;

    return [startTime, finishTime, duration];
}

function getGroups(event) {

    var groups = [];

    for (let i = 0; i < event.length; i++) {
        if (!groups.includes(event[i].machine_group)) {
            groups.push(event[i].machine_group);
        }
    }

    return groups;
}

function getStatus(eventDate, eventTimes) {
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
    //check filter is set
    if (filter === "Complete" || filter === "In Progress" || filter === "Upcoming") {
        filterSet = true;
    }

    div.innerHTML = "<tr><th>Event Name</th><th>Date</th><th>Start Time</th><th>Finish Time</th><th>Status</th><th>Details</th></tr>";

    if (str.length === 0) {
        //show all results when nothing in search
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //currently getting first result of each event, will display proper information once sortData is complete.
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
    } else if (str.length >= 3) {
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
    //console.log(filterType);
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

    //disable button (logic yet to be done)
    document.getElementById('disableEvent').innerHTML = "<button class='btn btn-danger' id='" + id + "' onclick='disableEvent(this.id)'>Disable</button>"

}


function logout() {
    document.cookie = "admin=; expires=Fri, 1 Jan 1960 23:59:59 GMT";
    window.location.href = './index.html';
}




