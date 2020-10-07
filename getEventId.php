<?php

require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

function getEventId($eventName)
{
    global $conn;
    $query = "select event_id from front_event where event_name = '$eventName'";
    $result = mysqli_query($conn, $query);

    return $result;
}

echo json_encode(getEventId());