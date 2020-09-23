<?php
require_once("config.php");

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

function userData($conn) {

    $result = mysqli_query($conn, "SELECT * FROM user");

    $results = array();

    $count = 0;

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $each = array();

        $each['username'] = $row['username'];
        $each['password'] = $row['password'];

        $results[$count] = json_encode($each);

        $count +=1;
    }

    return $results;
}

echo json_encode(userData($conn));

?>