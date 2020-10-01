let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) {
    searchData = sortData(JSON.parse(data));
    showResult("");
    return;
});

function addTimes(time, timeToAdd) {
    var timeToAddArr = timeToAdd.split(":");
    var ms = (60 * 60 * parseInt(timeToAddArr[0]) + 60 * (parseInt(timeToAddArr[1])) ) * 1000;
    var newTime =new Date('1970-01-01T' + time ).getTime() + ms
    var finalTime = new Date(newTime).toLocaleString('en-GB').slice(12 ,20)

    return finalTime;
}

function getTimes(event) {

    var offset = event[0].time_offset;
    var startTimeOffset = event[0].time;

    var startTime = addTimes(startTimeOffset, offset);

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

    return sortedData;
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
                "</td><td><button >View Details</button></td></tr>"
        }


    } else if (str.length >= 3) {
        //show results based off search based off event name
        for (let i = 0; i < searchData.length; i++) {
            let each = searchData[i]; //currently getting first result of each event, will display proper information once sortData is complete.
            if (each[1].toLowerCase().includes(str.toLowerCase())) {
                div.innerHTML += "<tr><td>" + each[1] +"</td><td>" +
                    each[2] +"</td><td>" + each[3] + "</td><td>" +
                    each[4] + "</td><td>" + each[7] +
                    "</td><td><button>View Details</button></td></tr>"
            }
        }
    }
    return;
}

function modalPopulate(event) { //populate the modal with more details

}






