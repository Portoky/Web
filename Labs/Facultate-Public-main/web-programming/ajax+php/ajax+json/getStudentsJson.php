<?php

    $grId = $_GET["groupId"];
    $limit = $_GET["limit"];

    if ($limit <= 0) {
        $limit = 10;
    }

    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "dbName";

	// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, displayName, role, groupId FROM user where groupId = ? limit ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $grId, $limit);
    $stmt->execute();
    $stmt->bind_result($id, $displayName, $role, $groupId);

    $users = array();

	while($stmt->fetch()) {
	    $user = new StdClass();
	    $user->id = $id;
	    $user->displayName = $displayName;
	    $user->role = $role;
	    $user->groupId = $groupId;

	    array_push($users, $user);
	}

    echo json_encode($users);

    $stmt->close();
	$conn->close();
?>

