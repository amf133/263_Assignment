let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) {
    searchData = sortData(JSON.parse(data));
    showResult("");
    return;
});

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
    let div = document.getElementById("events")
    div.innerHTML = "<tr><th>Event Name</th><th>Date</th><th>Start Time</th><th>Finish Time</th><th>Status</th><th>Details</th></tr>";

    if (str.length === 0) {
        //show all results when nothing in search
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //currently getting first result of each event, will display proper information once sortData is complete.
            div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                each[2] +"</td><td>" + each[3] + "</td><td>" +
                each[4] + "</td><td>" + each[7] +
                "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-primary' data-toggle='modal' data-target='#eventsModal'>View Details</button></td></tr>"
        }

    } else if (str.length >= 3) {
        //show results based off search based off event name
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //currently getting first result of each event, will display proper information once sortData is complete.
            if (each[1].toLowerCase().includes(str.toLowerCase())) {
                div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                    each[2] +"</td><td>" + each[3] + "</td><td>" +
                    each[4] + "</td><td>" + each[7] +
                    "</td><td><button id='" + each[0] + "' onclick='modalPopulate(this.id)' type='button' class='btn btn-primary' data-toggle='modal' data-target='#eventsModal'>View Details</button></td></tr>"
            }
        }
    }
    return;
}

function modalPopulate(id) { //populate the modal with more details

    //find list of elements with id that matches

    console.log("i'm here");

    //populate eventtile div and eventdescr div







    document.getElementById('eventTitle').innerHTML = "<h5>" + id + "</h5>";



}






