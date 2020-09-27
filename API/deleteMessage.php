<?php
	include 'utils.php';

	$inData = getRequestInfo();

	$message_id = $inData->message_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
    $sql = "DELETE FROM messages WHERE message_id='".$message_id"'";
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
