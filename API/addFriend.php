<?php
	include 'utils.php';

	$inData = getRequestInfo();

  //inData->whatever
  $user_id = $inData->user_id;
  $friend_id = $inData->friend_id;

	$conn = new mysqli("localhost", "dbadmin", "dbpass", "ContactManager");
	if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	else{
    $sql = "SELECT user_id,friend_id FROM friends WHERE (user_id='".$user_id."'".
      "AND friend_id='".$friend_id."')";
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
		$conn->close();
	}

?>
