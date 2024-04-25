<?php
   $id = $_GET["id"];

    $servername = "localhost";
    $usern = "root";
    $password = "";
    $dbname = "myfirstdb";

	// Create connection
    $conn = new mysqli($servername, $usern, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT name, username, role, email, age, webpage FROM `user` where id = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($name, $username, $role, $email, $age, $webpage);

    $stmt->fetch();

    $user = new StdClass();
	$user->name = $name;
    $user->username = $username;
	$user->role = $role;
    $user->email = $email;
    $user->age = $age;
    $user->webpage = $webpage;

    echo json_encode($user);

    $stmt->close();
	$conn->close();
?>