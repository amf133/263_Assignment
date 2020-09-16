<!DOCTYPE html>
<html>
<head>
    <title>UC Exam Scheduler</title>
</head>
<body>
<div id="viewPage">
    <h2> Upcoming events </h2>
    <form action="ViewEvent.php" method="post">
        <div class="container">

            <input type="submit" value="Back" onClick="myFunction()"/>
            <script>
                function myFunction() {
                    window.location.href="index.php";
                }
            </script>
            <br/> <br/>
        </div>

    </form>

</div>

</body>
</html>

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
    $query = "select * from vw_front_event where date < CURDATE() order by date, time, cluster_id, group_id";
    $result = mysqli_query($conn, $query);

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $activate = "Activate";
        if ($row["activate"] == 0) { $activate = "Deactivate";}
        echo $row['event_name'] . " " . $row['date'] . " " . $row['time'] . " " .
            $activate . " " . $row['machine_group'] . "<br>";
    }

}
viewEvent($conn);
?>