<?php
header("Content-Type: application/json; charset=utf-8");

$context = stream_context_create(array(
    'http' => array(
        'header'  => "Authorization: Basic " . base64_encode("goblin:beta")
    )
));

echo file_get_contents("http://d7.goblins.net/mobileapp.php?rop=get_review&req=72258", false, $context);

