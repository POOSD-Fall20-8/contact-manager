<!DOCTYPE html>
<html>
<body>
<?php
	$conn = new mysqli("localhost","dbadmin","dbpass","ContactManager");
	if($conn->connect_error){
		echo "error\n";
	}
	else{
		echo "connected to db\n";
	}
	$login = RickL;
	$pass = COP4331;
	$sql = "SELECT ID,firstName,lastName FROM Users where Login='" . $login . "' and Password='" . $pass . "'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0)
	{
		$row = $result->fetch_assoc();
		$firstName = $row["firstName"];
		$lastName = $row["lastName"];
		$id = $row["ID"];

		echo "Name: ".$firstName." ".$lastName"\n";
		echo "ID: ".$id."";
	}
	else
	{
		returnWithError( "No Records Found" );
	}
	$conn->close();
?>
</body>
</html>
