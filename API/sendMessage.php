<?php
	include 'utils.php';

	$inData = getRequestInfo();

  // buildMessageJSON($message_id,$sender_id,$recipient_id,$contact_id,$message_text,$status)
	$sender_id = $inData->sender_id;
	$recipient_id = $inData->recipient_id;
	$contact_id = $inData->contact_id;
	$message_text = $inData->message_text;
	$status = UNREAD;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "INSERT INTO messages (sender_id,recipient_id,";
		if($contact_id != ""){
			$sql .= "contact_id,";
		}
		$sql .= "message_text,status) VALUES ('". $sender_id . "','". $recipient_id . "',";
		if($contact_id != ""){
			$sql .= "'".$contact_id."',";
		}
		$sql .= "'".$message_text."','".$status."')";
		$result = $conn->query($sql);
		 if($result == TRUE){
				returnWithInfo(buildMessageJSON($conn->insert_id,$sender_id,$recipient_id,$contact_id,$message_text,$status));
			}
			else{
				returnWithError($conn->error);
			}
		$conn->close();
	}

?>
