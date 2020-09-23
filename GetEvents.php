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
    $query = "select event_name, cluster_name, date, time, activate, machine_group, time_offset
                from vw_front_event natural join front_action
                where date < CURDATE() and (curdate() - interval 150 day) < date
                order by date, time, group_id;";
    $result = mysqli_query($conn, $query);

    $count = 0;
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

        $results[$count] = json_encode($each);

        $count += 1;

    }
    return $results;

}

echo json_encode(viewEvent($conn)); //GetEvents.js will pick this up

?>
