let clusters;
let rooms;
let highlightedRooms = [];

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

        //Remove the tablet
        let addedRooms = document.getElementById('addedRooms')
        let buttonGroupID = document.getElementById(str+"buttonGroupID");
        let addedRoomButton = document.getElementById(str + "badgeID");
        buttonGroupID.removeChild(addedRoomButton);
        addedRooms.removeChild(buttonGroupID);
        return;

    }

}

