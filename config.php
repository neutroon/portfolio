<?php
    $dbType = 'pgsql';
    $host = 'ec2-63-34-16-201.eu-west-1.compute.amazonaws.com';
    $dbname = 'd4cc3kapo1oout';
    $usrName = 'adtsanfuhvzfol';
    $pass = '6f536f330e36cb54a9d9ec79118ce36398724b231f763290989145aa4e6ef965';



    $dsn = 'pgsql:host=ec2-63-34-16-201.eu-west-1.compute.amazonaws.com;dbname=d4cc3kapo1oout';
    $usrName = 'adtsanfuhvzfol';
    $pass = '6f536f330e36cb54a9d9ec79118ce36398724b231f763290989145aa4e6ef965';

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
