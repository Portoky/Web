<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "myfirstdb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $name = $_POST["name"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    $role = $_POST["role"];
    $email = $_POST["email"];
    $age = $_POST["age"];
    $webpage = $_POST["webpage"];

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "INSERT INTO `user` (`id`,`name`, `username`, `password`, `role`, `email`, `age`, `webpage`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssis", $name, $username, $password, $role, $email, $age, $webpage);

    $stmt->execute();

    $stmt->close();
	$conn->close();
?>