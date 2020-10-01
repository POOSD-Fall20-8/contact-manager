<?php
	include 'utils.php';

	$inData = getRequestInfo();

  //inData->whatever
  $user_id = $inData->user_id;
	$friend_name = $inData->friend_name;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
		$sql = "SELECT user_id FROM users WHERE login='".$friend_name."'";
		$result = $conn->query($sql);
		if($result->num_rows > 0){
			$row = $result->fetch_assoc();
			$friend_id = $row[user_id];
			$sql = "SELECT user_id,friend_id FROM friends WHERE (user_id='".$user_id."'".
				"AND friend_id='".$friend_id."') OR (friend_id='".$user_id."'".
					"AND user_id='".$friend_id."')";
			$result = $conn->query($sql);
			if($result->num_rows > 0){
				returnWithError("Already Friends");
			}
			else{
				$sql = "INSERT INTO friends (user_id,friend_id) VALUES ('".$user_id."','".$friend_id."')";
				$result = $conn->query($sql);
				if($result == TRUE){
					returnWithInfo(buildFriendJSON($user_id,$friend_id));
				}
				else{
					returnWithError($conn->error);
				}
			}
		}
		else{
			returnWithError("No Users Found");
		}
		$conn->close();
	}

?>
