<?php
	include 'utils.php';

	function returnWithError( $err ){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id ){
		$retValue = '{"record_id":"' . $id   . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	$inData = getRequestInfo();



	$first_name = $inData->first_name;
	$last_name = $inData->last_name;
	$email = $inData->email;
	$phone = $inData->phone;
	$address = $inData->address;
	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "SELECT record_id FROM contacts WHERE (first_name='". $first_name."'".
			" AND last_name='". $last_name."' AND email='". $email."' AND ".
			" phone = '". $phone."' AND address= '". $address."' AND user_id='".$user_id"')";
		$result = $conn->query($sql);
		if ($result->num_rows > 0){
			returnWithError("Duplicate Contact");
		}
		else {
			$sql = "INSERT INTO contacts (address,email,first_name,last_name,phone,user_id,date_added)".
							" VALUES ('". $address . "','". $email . "', '". $first_name ."','" . $last_name ."','".
							$phone ."','". $user_id . "', NOW())";
			$result = $conn->query($sql);
			if(result == TRUE){
				returnWithInfo($conn->insert_id);
			}
			else{
				returnWithError($conn->error);
			}
		}
		$conn->close();
	}

?>
