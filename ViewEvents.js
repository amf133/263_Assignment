let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) {
    searchData = JSON.parse(data);
    showResult("");
    sortData(); // does nothing atm
    return;
});

function sortData() { //this function will convert searchData into more consumable data

    //increment through each event_id

    //figure out what groups are involved (machine_group)

    //figure out time, how long (time, offset etc)

    //figure our current state (activate)

    //return updated searchData which showResult can process

}

function showResult(str) {
    let keys = Object.keys(searchData);

    let div = document.getElementById("events")
    div.innerHTML = "<tr><th>Event Name</th><th>Date</th><th>Time</th><th>Group</th><th>Activate</th><th>Details</th></tr>";


    for (let i = 0; i < keys.length; i++) {
        let each = searchData[keys[i]][0]; //currently getting first result of each event, will display proper information once sortData is complete.
        div.innerHTML += "<tr><td>" + each.event_name +"</td><td>" + each.date +"</td><td>" + each.time + "</td><td>" + each.machine_group + "</td><td>" + each.activate + "</td><td><button>View Details</button></td>          </tr>"
        console.log(each);
    }

    if (str.length === 0) {
        //show all results when nothing in search


    } else if (str.length >= 3) {
        //show results based off search based off event name


    }
    return;
}






