<?php
require_once("config.php");

//Establish connection to db
$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
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
    return mysqli_fetch_row($result)[0] + 1; //pretty sure i need to convert this to an int first
}

function addEvent($event_name, $group_list, $date, $cluster, $start_time, $finish_time) {
    /* get variables from JS, convert to required input, add to database */
    $group_ids = getGroupIds($group_list);
    $event_id = get_new_id();
    $dyWkYr = getDates($date); //array with three values
    $cluster_id = getClusterId($cluster);
    $length = $finish_time - $start_time;
    $rows = $group_ids.length();

    $q1 = "insert into front_event (event_name, status) values ('$event_name', 1)";
    $q2 = "select group_id from front_group where machine_group in ('Erskine-033', 'Erskine-035', 'Erskine-036', 'Erskine-038')";
    $q3 = "select cluster_id from front_cluster where cluster_name = 'MapleTA'";
    $q4 = "insert into front_weekly (event_id, week_of_year, event_year) values ($event_id, $dyWkYr[1], $dyWkYr[2])";
    for ($i = 0; $i < $rows; $i++) {
        $q5 = "insert into front_daily (event_id, group_id, day_of_week, start_time) values ($event_id, $group_ids[i], $dyWkYr[0], '18:00:00')";
    }
    $q6 = "insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '-00:05:00', 3, 0)";
    $q7 = "insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '-00:05:00', $cluster_id, 1)";
    $q8 = "insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '$length', $cluster_id, 0)";
    $q9 = "insert into front_action (event_id, time_offset, cluster_id, activate) values ($event_id, '$length', 3, 1)";
}

/*
insert into front_event (event_name, status) values ('EMTH119-20S2 Tuesday', 1); -- 173
select group_id from front_group where machine_group in ('Erskine-033', 'Erskine-035', 'Erskine-036', 'Erskine-038'); -- 5, 6, 22, 7
select cluster_id from front_cluster where cluster_name = "MapleTA"; -- 4
insert into front_weekly (event_id, week_of_year, event_year) values (173, 34, 2020);
insert into front_daily (event_id, group_id, day_of_week, start_time) values (173, 5, 2, '18:00:00');
insert into front_daily (event_id, group_id, day_of_week, start_time) values (173, 6, 2, '18:00:00');
insert into front_daily (event_id, group_id, day_of_week, start_time) values (173, 22, 2, '18:00:00');
insert into front_daily (event_id, group_id, day_of_week, start_time) values (173, 7, 2, '18:00:00');
insert into front_action (event_id, time_offset, cluster_id, activate) values (173, '-00:05:00', 3, 0);
insert into front_action (event_id, time_offset, cluster_id, activate) values (173, '-00:05:00', 4, 1);
insert into front_action (event_id, time_offset, cluster_id, activate) values (173, '01:00:00', 4, 0);
insert into front_action (event_id, time_offset, cluster_id, activate) values (173, '01:00:00', 3, 1);
*/

$cluster = "MapleTA";
print_r(getNewId());
?>