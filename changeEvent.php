<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

function disableEvent($eventId) {
    global $conn;
    $query = "select activate from front_action where event_id = '$eventId'";

}

function enableEvent($eventId) {
    global $conn;

}