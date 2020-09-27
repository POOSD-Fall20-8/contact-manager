<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$record_id = $inData->record_id;
	$user_id = $inData->user_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "DELETE FROM contacts WHERE record_id='". $record_id . "' and user_id='". $user_id ."'";
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo('{"record_id" : "'.$record_id.'"}');
		}
		else{
			returnWithError("Record Not Found");
		}
		$conn->close();
	}

?>
