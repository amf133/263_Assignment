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
    //need to change query to look at the next 7 days, not the past 150
    $query = "select event_name, cluster_name, date, time, activate, machine_group, time_offset
                from vw_front_event natural join front_action
                where date < CURDATE() and (curdate() - interval 150 day) < date
                order by date, time, group_id;";
    $result = mysqli_query($conn, $query);

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $activate = "Activate";
        if ($row["activate"] == 0) { $activate = "Deactivate";}
        echo $row['event_name'] . " " . $row['cluster_name'] . " " . $row['date'] . " " . $row['time'] . " " .
            $activate . " " . $row['machine_group'] . " " . $row['time_offset'] . " " .  "<br>";
    }

}
viewEvent($conn);
?>