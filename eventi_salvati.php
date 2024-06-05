<?php 
    require_once 'auth_1.php';
    if (!$userid = checkAuth()) exit;

    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $userid = mysqli_real_escape_string($conn, $userid);
    
    $next = isset($_GET['from']) ? 'AND events.id < '.mysqli_real_escape_string($conn, $_GET['from']).' ' : '';

    $query = "SELECT id, user_id, event_id, content from eventi where user_id = '$userid' ORDER BY id DESC LIMIT 10";

    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    $array = array();
    while($row = mysqli_fetch_assoc($res)) {
        $array[] = array('userid' => $row['user_id'],
                            'eventid' => $row['event_id'], 'content' => json_decode($row['content']));
    }
    echo json_encode($array);
    
    exit;


?>