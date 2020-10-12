<?php

/*======================================================================================================================
Filename: ViewEvents.php
Description: Connect with the database and retrieve all event details. This will be picked up by ViewEvents.js which
will dynamically populate the table in ViewEvents.html or the dynamic count on index.html

Authors:
Simon Lorimer
Alec Fox
Sean Madondo
Josiah Thorpe
======================================================================================================================*/

require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database); //new connection to database

if ($conn->connect_error)
{
    fatalError($conn->connect_error);
    return;
}

function viewEvent($conn) {
    //SQL statement to get all event details from database
    $query = "select * from display_view order by date, time, group_id";

    $result = mysqli_query($conn, $query);

    $results = array();

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {

        //make an array for current event state with all details
        $each = array();
        $each['event_name'] = $row['event_name'];
        $each['cluster_name'] = $row['cluster_name'];
        $each['date'] = $row['date'];
        $each['time'] = $row['time'];
        $each['machine_group'] = $row['machine_group'];
        $each['time_offset'] = $row['time_offset'];
        $each['activate'] = $row['activate'];

        $id = (string)$row["event_id"];

        if (array_key_exists($row['event_id'], $results)) { //if event_id already exists, add to existing entry of results
            $before = $results[$row['event_id']];
            array_push($before, $each);
            $results[$id] = $before;

        } else { //if event_id doesn't exist, add to results
            $results[$id] = [$each];
        }
    }
    return $results;

}

echo json_encode(viewEvent($conn)); //ViewEvents.js will pick this up

?>
