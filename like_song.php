<?php

    require_once 'auth_1.php';
    if (!$userid = checkAuth()) exit;


like();

function like() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
    $artista = mysqli_real_escape_string($conn, $_POST['artista']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);

    $query = "SELECT * FROM canzoni WHERE user_id = '$userid' AND song_id = '$id'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('ok' => true));
        exit;
    }

    $query = "INSERT INTO canzoni(user_id, song_id, content) VALUES('$userid','$id', JSON_OBJECT('id', '$id', 'titolo', '$titolo', 'artista', '$artista', 'image', '$image'))";
    error_log($query);
    if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
        echo json_encode(array('ok' => true));
        exit;
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
}

?>