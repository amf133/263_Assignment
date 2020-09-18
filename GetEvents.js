$.get('GetEvents.php', function (data) {
    var dataObj = JSON.parse(data);
    console.log(dataObj);

    var div = document.getElementById('events');

    for (var i = 0; i < dataObj.length; i++) {
        let each = JSON.parse(dataObj[i]);
        div.innerHTML += each.event_name + ' ' + each.cluster_name + ' ' + each.date + ' ' + each.time_offset + ' ' + each.machine_group + ' ' + each.activate + '<br/>';
        console.log(dataObj[i]);
    }
});