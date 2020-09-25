<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

function getClusterId($cluster) {
    /* Returns a cluster ID from a given cluster name */
    global $conn;
    $query = "select cluster_id from front_cluster where cluster_name = '$cluster'";
    $result = mysqli_query($conn, $query);
    return mysqli_fetch_row($result)[0];
}

function getDates($date) {
    /* Returns an array containing the day of week, week of year and year variables */
    global $conn;
    $date = new DateTime($date);
    $week = $date->format("W");
    $year = $date->format("Y");
    $day = $date->format("d")%7; //%7 to get day of week, not day of month
    echo "Day: $day";
    return array($day, $week, $year);
}

function getGroupIds($groups) {
    /* Returns an array containing the group ID's from a given array of groups */
    global $conn;
    $thing = implode('\', \'', $groups);
    $query = "select group_id from front_group where machine_group in ('$thing')";
    $result = mysqli_query($conn, $query);

    $results = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        array_push($results, $row['group_id']);
    }
    return $results;
}

function getNewId() {
    /* Returns the next auto increment of group_id to use */
    global $conn;
    $query = "select max(event_id) from front_event";
    $result = mysqli_query($conn, $query);
    return mysqli_fetch_row($result)[0] + 1;
}

function submitQuery($query) {
    /* Submit query to server from given string */
    global $conn;
    mysqli_query($conn, $query);
}

function addEvent($event_name, $groups, $date, $cluster, $start_time, $finish_time) {
    /* get variables from JS, convert to required input, add to database */
    $group_ids = getGroupIds($groups);
    $event_id = getNewId();
    $dyWkYr = getDates($date); //array with three values
    $cluster_id = getClusterId($cluster);
    $length = $finish_time - $start_time; //I feel like this line needs to be changed
    $rows = count($group_ids);

    submitQuery("insert into front_event (event_name, status) values ('$event_name', 1)");
    submitQuery("insert into front_weekly (event_id, week_of_year, event_year) values ($event_id, $dyWkYr[1], $dyWkYr[2])");
    for ($i = 0; $i < $rows; $i++) { //loop through the rooms that we need to add
        submitQuery("insert into front_daily (event_id, group_id, day_of_week, start_time) values ($event_id, $group_ids[i], $dyWkYr[0], '18:00:00')");
    }
    submitQuery("insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '-00:05:00', 3, 0)");
    submitQuery("insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '-00:05:00', $cluster_id, 1)");
    submitQuery("insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '$length', $cluster_id, 0)");
    submitQuery("insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '$length', 3, 1)");

}