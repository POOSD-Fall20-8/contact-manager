<?php
	include 'utils.php';

	$inData = getRequestInfo();
	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$first_name = $conn->real_escape_string($inData->first_name);
		$last_name = $conn->real_escape_string($inData->last_name);
		$email = $conn->real_escape_string($inData->email);
		$phone = $conn->real_escape_string($inData->phone);
		$address = $conn->real_escape_string($inData->address);
		$user_id = $conn->real_escape_string($inData->user_id);
		$record_id = $conn->real_escape_string($inData->record_id);

		if($first_name == "" && $last_name == "" && $email == "" && $phone == "" &&$address==""){
			returnWithError("Contact Must Not Be Empty");
		}
		else {
			$sql = "UPDATE contacts SET ";
			$sql .= "first_name = '" . $first_name ."',";
			$sql .= "last_name = '" . $last_name ."',";
			$sql .= "email = '" . $email ."',";
			$sql .= "phone = '" . $phone ."',";
			$sql .= "address = '".$address."' ";

			$sql .= "WHERE user_id = '". $user_id ."' AND record_id = '". $record_id . "'";
			$result = $conn->query($sql);
				if ($conn->affected_rows > 0){
					returnWithInfo(buildContactJSON($first_name,$last_name,$email, $phone,$address,$record_id));
				}
				else {
					returnWithError("Could Not Match Record");
				}
		}
	$conn->close();
	}

?>
