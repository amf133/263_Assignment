<?php
require_once("config.php");

//Establish connection to db
$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
    fatalError($conn->connect_error);
    return 502; //invalid response from server
}

//Function to return all the user data from the database, this will be used to check against login credentials
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