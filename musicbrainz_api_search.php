<?php
    require_once 'auth_1.php';


    if (!checkAuth()) exit;


    if(isset($_GET["q"]))
    {
        $query = urlencode($_GET["q"]);
    
        $url='https://musicbrainz.org/ws/2/event/?query=event:' . $query . '&type:group&fmt=json';
        $userAgent = 'hw1App/1.0 (mnllnz02l31f892j@studium.unict.it)';

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt_array($curl, array(CURLOPT_HTTPHEADER => array('User-Agent:' .$userAgent) ));
        $res = curl_exec($curl);
        curl_close($curl);
    
        echo $res;
    }
?>