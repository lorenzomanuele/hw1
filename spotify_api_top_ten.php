<?php
    spotifyhw1();
    function spotifyhw1(){
    header('Content-Type: application/json');

    $client_id = '5c95b5544df4430886ad5f4db8272689';
    $client_secret = 'ef1b9a487ca741af8801397998ea1494';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token' );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials'); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret))); 
    $token=json_decode(curl_exec($ch), true);
    curl_close($ch);    

    $url = 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token'])); 
    $res=curl_exec($ch);
    curl_close($ch);

    echo $res;
    }
?>