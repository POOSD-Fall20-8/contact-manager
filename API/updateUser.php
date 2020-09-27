<?php

	include 'utils.php';

	$inData = getRequestInfo();

	$user_id = $inData->user_id;
	$password = $inData->password;
	$first_name = $inData->first_name;
	$last_name = $inData->last_name;

    $conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
    }
    else{
		$sql = "UPDATE users SET ";

        if($first_name !=""){
			$sql .= "first_name = '" . $first_name ."',";

        }if ($last_name != ""){
			$sql .= "last_name = '" . $last_name ."',";

        }
		if ($password != ""){
			$sql .= "password = '" . $password ."',";

		}
		if (substr($sql,-1) == ","){
			$sql = substr_replace($sql," ",-1);
		}
		else{
			returnWithError("No Fields To Update");
		}
		$sql .= "WHERE user_id = '". $user_id ."'";
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo(buildUserJSON($login,$first_name,$last_name,$user_id));
		}
		else {
			returnWithError("Could Not Match Record");
		}
        $conn->close();
	}



?>
