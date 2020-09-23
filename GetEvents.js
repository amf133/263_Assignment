let searchData; //info pulled from GetEvents.php and added in JSON format here

$.get('GetEvents.php', function (data) {
    searchData = JSON.parse(data);
    showResult("");
    return;
});

function showResult(str) {
    let div = document.getElementById('events');
    div.innerHTML = "<tr><th>Event Name</th><th>Date</th><th>Cluster</th><th>Offset</th><th>Group</th><th>Activate</th><th>Details</th></tr>";

    if (str.length === 0) {
        //show all results when nothing in search
        for (let i = 0; i < searchData.length; i++) {
            let each = JSON.parse(searchData[i]);
            div.innerHTML += "<tr><td>" + each.event_name + "</td><td>" + each.date + "</td><td>" + each.cluster_name + "</td><td>" + each.time_offset + "</td><td>" + each.machine_group + "</td><td>" + each.activate + "</td><td><button>View Details</button></td>" + "</tr>";
        }
    } else if (str.length >= 3) {
        //show results based off search based off event name
        for (let i = 0; i < searchData.length; i++) {
            let each = JSON.parse(searchData[i]);
            if (((each.event_name).toLowerCase()).includes(str.toLowerCase())) {
                div.innerHTML += "<tr><td>" + each.event_name + "</td><td>" + each.date + "</td><td>" + each.cluster_name + "</td><td>" + each.time_offset + "</td><td>" + each.machine_group + "</td><td>" + each.activate + "</td><td><button>View Details</button></td>" + "</tr>";
            }
        }
    }
    return;
}






