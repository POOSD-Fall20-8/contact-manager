<?php
	include 'utils.php';

	$inData = getRequestInfo();
	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$user_id = $conn->real_escape_string($inData->user_id);
	  $friend_id = $conn->real_escape_string($inData->friend_id);

		$sql = "DELETE FROM friends WHERE (user_id='". $user_id . "' AND friend_id='". $friend_id ."')".
		" OR (friend_id='". $user_id . "' AND user_id='". $friend_id ."')";
		$result = $conn->query($sql);
		if ($conn->affected_rows > 0){
			returnWithInfo(buildFriendJSON($user_id,$friend_id));
		}
		else{
			returnWithError("Friend Not Found");
		}
		$conn->close();
	}

?>
