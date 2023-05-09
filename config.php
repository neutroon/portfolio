<?php
    $dbType = 'pgsql';
    $host = 'ec2-99-80-210-37.eu-west-1.compute.amazonaws.com';
    $dbname = 'dbluakp0keapqa';
    $usrName = 'vcphgrkezcjuig';
    $pass = 'c62352f18851a348c773676017d8685151638a611500a8a6c8db35afca04efd1';



    $dsn = 'pgsql:host=ec2-99-80-210-37.eu-west-1.compute.amazonaws.com;dbname=dbluakp0keapqa';
    $usrName = 'vcphgrkezcjuig';
    $pass = 'c62352f18851a348c773676017d8685151638a611500a8a6c8db35afca04efd1';

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
