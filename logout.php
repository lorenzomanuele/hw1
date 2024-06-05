<?php
    include 'dbconfig_1.php';

    session_start();
    session_destroy();

    header('Location: index.php');
?>