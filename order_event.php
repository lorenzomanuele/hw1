<?php

    require_once 'auth_1.php';
    if (!$userid = checkAuth()) exit;


musicbrainz();

function musicbrainz() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $nome = mysqli_real_escape_string($conn, $_POST['nome']);
    $artista = mysqli_real_escape_string($conn, $_POST['artista']);

    $query = "SELECT * FROM eventi WHERE user_id = '$userid' AND event_id = '$id'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('ok' => true));
        exit;
    }

    $query = "INSERT INTO eventi(user_id, event_id, content) VALUES('$userid','$id', JSON_OBJECT('id', '$id', 'nome', '$nome', 'artista', '$artista'))";
    error_log($query);
    if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
        echo json_encode(array('ok' => true));
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
}

?>