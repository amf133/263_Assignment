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
            <label for="group_id"><b>Group ID</b></label>
            <br/>
            <input type="text" placeholder="Enter Group ID" name="group_id" required>
            <br/> <br/>

            <button type="submit">Submit</button>
            <br/> <br/>

            <input type="submit" value="Back" onClick="myFunction()"/>
            <script>
                function myFunction() {
                    window.location.href="HomePage.php";
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

function viewEvent($conn, $id) {
    $query = "select event_name, week_of_year,
                event_year, day_of_week, start_time, action_id,
                time_offset, activate from front_event
                natural join front_weekly
                natural join front_daily
                natural join front_action
                where front_event.event_id = $id
                order by start_time, cluster_id";
    $result = mysqli_query($conn, $query);

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        echo $row['event_name'] . " " . $row['week_of_year'] . " " . $row['event_year'] .
            " " . $row['day_of_week'] . " " . $row['start_time'] . " " .
            $row['action_id'] . " " . $row['time_offset'] . " " . $row['activate']. "<br>";
    }

}
if (isset($_POST['group_id'])) {
    $group_id = $_POST['group_id'];
    viewEvent($conn, $group_id);
}
?>