let clusters;

let rooms;

$.get('getClusters.php', function (data) {
    clusters = JSON.parse(data);
    showClusters(); //Populate the clusters dropdown on page load.
    return;
});

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

//Function to highlight all selections when selecting rooms.
function addSelectedRooms(str) {
    let selectedRooms = [];
    // $("#" + str).classList.add("active");
    return;
}

