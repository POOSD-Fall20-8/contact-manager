<?php

	include 'utils.php';

	function returnWithError( $err ){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $login ){
		$retValue = '{"login":"' . $login . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();

	$login = $inData->login;
	$password = $inData->password;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;

    $conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
    }
    else{
        $sql = "UPDATE Users SET";
        if($first_name !=""){
            $sql .= "first_name = '" . $first_name ."',";
        }if ($last_name != ""){
                $sql .= "last_name = '" . $last_name ."',";
        }if ($login != ""){
            $sql .= "login = '" . $login ."',";
        }if ($password != ""){
            $sql .= "password = '" . $password ."',";
        }
        
    }
	
?>