<?php
	include 'utils.php';

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
		if (($first_name . $last_name . $email . $phone . $address) == ""){
			//no blank entries
			returnWithError("Contact Must Not Be Empty");
		}
		else{
				$sql = "SELECT record_id FROM contacts WHERE (first_name='". $first_name."'".
					" AND last_name='". $last_name."' AND email='". $email."' AND ".
					" phone = '". $phone."' AND address= '". $address."' AND user_id='".$user_id."')";
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
						returnWithInfo(buildContactJSON($first_name,$last_name,$email, $phone,$address,$conn->insert_id));
					}
					else{
						returnWithError($conn->error);
					}
			}
		}
		$conn->close();
	}

?>
