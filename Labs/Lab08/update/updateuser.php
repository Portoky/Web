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
    $id = $_POST["id"];
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "UPDATE `user` SET `name` = ?, `username` = ?, `password` = ?, `role` = ?, `email` = ?, `age` = ?, `webpage` = ? WHERE `id`=?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssisi", $name, $username, $password, $role, $email, $age, $webpage, $id);

    $stmt->execute();

    $stmt->close();
	$conn->close();
?>