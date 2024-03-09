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

	echo "<table border='1'><tr><th>ID</th><th>Name</th><th>Role</th><th>GroupId</th></tr>";

	while($stmt->fetch()){
		echo "<tr>";
		echo "<td>" . $id . "</td>";
		echo "<td>" . $displayName . "</td>";
		echo "<td>" . $role . "</td>";
		echo "<td>" . $groupId . "</td>";
		echo "</tr>";
	}

	echo "</table>";

    $stmt->close();
	$conn->close();
?>

