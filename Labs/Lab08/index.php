<?php
    $role = $_GET["role"];
    $name = $_GET["name"];
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "myfirstdb";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql="";
    $stmt = null;
    if($role==""){
        $sql = "SELECT id, name, username, role, email, age, webpage FROM user where name LIKE ?";
        $stmt = $conn->prepare($sql);
        $name = '%' . $name . '%';
        $stmt->bind_param("s", $name);
    }
    else{
        $sql = "SELECT id, name, username, role, email, age, webpage FROM user where role = ? and name LIKE ?";
        $stmt = $conn->prepare($sql);
        $name = '%' . $name . '%';
        $stmt->bind_param("ss", $role, $name);
    }
    
    $stmt->execute();
    $stmt->bind_result($id, $name, $username, $role, $email, $age, $webpage);

    echo "<table id=userTable border='1'><tr id=0 ><th>Id</th><th>Name</th><th>UserName</th><th>role</th><th>email</th>
    <th>age</th><th>webpage</th></tr>";
    $i = 0;
    while($stmt->fetch()){
		echo "<tr id=". $id .">";
		echo "<td>" . $id . "</td>";
		echo "<td>" . $name . "</td>";
        echo "<td>" . $username . "</td>";
		echo "<td>" . $role . "</td>";
		echo "<td>" . $email . "</td>";
        echo "<td>" . $age . "</td>";
        echo "<td>" . $webpage . "</td>";
		echo "</tr>";
	}

	echo "</table>";
    $stmt->close();
	$conn->close();
?>