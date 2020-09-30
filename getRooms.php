<?php

require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

/* Returns an array of all the rooms in the database
    This will be used for room selection when creating a new event */

function getRooms() {
    global $conn;
    $query = "SELECT room_name FROM front_room";
    $result = mysqli_query($conn, $query);
    $results = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        array_push($results, $row['room_name']);
    }
    return $results;
}

echo json_encode(getRooms());

?>