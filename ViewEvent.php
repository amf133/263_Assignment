<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css">
    <link rel="stylesheet" href="styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>UC Exam Scheduler</title>
</head>
<body>
<div id="viewPage class = "container">
    <div class = "row mt-3">
        <div class = "col text-center">
            <h2> Upcoming events </h2>
        </div>
    </div>
    <div class = "row mt-3">
        <div class = "col text-center">
            <button onClick="window.location.href='index.php'"/>Back</button>
        </div>
    </div>
    <br/> <br/>
</div>

</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
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