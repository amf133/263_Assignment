let searchData; //info pulled from ViewEvents.php and added in JSON format here

$.get('ViewEvents.php', function (data) {
    searchData = JSON.parse(data);
    showResult("");
});

function showResult(str) {
    //console.log(str);
    //let div = document.getElementById('events');
    //div.innerHTML = "<tr><th>Event Nassme</th><th>Date</th><th>Cluster</th><th>Offset</th><th>Group</th><th>Activate</th><th>Details</th></tr>";

    if (str.length === 0) {
        //show all results when nothing in search
        for (let i = 0; i < searchData.length; i++) {


        }

    } else if (str.length >= 3) {
        //show results based off search based off event name





    }
    //return;
}






