<?php
    require_once 'auth_1.php';
    if (!$userid = checkAuth()) exit;


delete();

function delete() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    

    $id = $_POST['id'];
    
    $query = "DELETE FROM eventi WHERE user_id = '$userid' AND event_id = '$id'";
    error_log($query);
    if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
        echo json_encode(array('ok' => true, 'id' => $id, 'action' => 'cancella_singolo'));
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
}

?>