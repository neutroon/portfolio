<?php
    $dsn = 'pgsql:host=localhost;dbname=portfolio';
    $usrName = 'root';
    $pass = '';

    // $options = array (
    //     PDO::MYSQL_ATTR_INIT_COMMAND => 'SET usrNames utf8',
    // );

    try {
        $db = new PDO($dsn, $usrName, $pass);    
    }
    catch (PDOException $e){
        echo 'faild ' . $e->getMessage();
    }

?>
