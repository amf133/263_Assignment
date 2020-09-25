<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

function getClusters() {
    /* Returns an array of all clusters in the database (called from JS) */
    global $conn;
    $query = "select cluster_name from front_cluster";
    $result = mysqli_query($conn, $query);
    $results = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        array_push($results, $row['cluster_name']);
    }
    return $results;
}

echo json_encode(getClusters());
?>