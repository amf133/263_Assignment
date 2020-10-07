<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
    fatalError($conn->connect_error);
    return;
}

function viewEvent($conn) {
    //SQL statement to increase the number of days: CURDATE() + INTERVAL 1 DAY
    //need to change query to look at the next 7 days, not the past 150
    $query = "select event_name, cluster_name, date, time, activate, machine_group, time_offset, event_id
                from vw_front_event natural join front_action
                order by date, time, group_id;";
    $result = mysqli_query($conn, $query);

    $results = array();

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {

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
