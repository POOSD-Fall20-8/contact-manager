<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		 $message_id = $conn->real_escape_string($inData->message_id);
    $sql = "DELETE FROM messages WHERE message_id='".$message_id."'";
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo('{"message_id":"'.$message_id.'"}');
		}
		else{
			returnWithError("Message Not Found");
		}
		$conn->close();
	}

?>
