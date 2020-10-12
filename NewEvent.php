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
    $day = $date->format("N")%7;//have no clue why we need to include the '%7' but it makes it work so..
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
    if(mysqli_query($conn, $query) === FALSE) {
        exit("One or more queries failed execution");
    };
}

function addEvent($event_name, $groups, $date, $cluster, $start_time, $finish_time, $offset) {
    /* get variables from JS, convert to required input, add to database */
    global $conn;
    //sanitize to prevent malicious code being deposited in database
    $event_name = sanitizeInput($event_name, $conn);
    $offset = sanitizeInput($offset, $conn);

    $group_ids = getGroupIds($groups);
    $event_id = getNewId();
    $dyWkYr = getDates($date); //array with three values
    $cluster_id = getClusterId($cluster);

    $start_date = new DateTime($date . $start_time);
    $length = $start_date->diff(new DateTime($date . $finish_time))->format("%H:%I:%S");

    $rows = count($group_ids);

    //calling stored procedures
    submitQuery("call add_event_week('$event_name', $event_id, $dyWkYr[1], $dyWkYr[2])");
    for ($i = 0; $i < $rows; $i++) { //loop through the rooms that we need to add
        submitQuery("call add_daily($event_id, $group_ids[$i], $dyWkYr[0], '$start_time')");
    }
    submitQuery("call add_action($event_id, $cluster_id, '-$offset', '$length')");
    echo "Success!";
}

//this only runs if data is send as a 'post' method
if ( isset($_POST["sendData"]) ) {
    $data = $_POST["sendData"];
    $groups = explode(',', $data["groups"]);
    addEvent($data["event_name"], $groups, $data["date"], $data["cluster"], $data["start_time"], $data["finish_time"], $data["offset"]);
}

//sanitize inputs
function sanitizeInput($input, $conn)
{
    if (get_magic_quotes_gpc()) {

        $input = stripslashes($input);
    }
    $input = $conn->real_escape_string($input);

    return htmlentities($input);
}
