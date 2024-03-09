
<?php
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "db_name";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        echo "Connected to MySQL";
    }

    $sql = "SELECT * FROM user limit 10";
    $result = $conn->query($sql);

    echo "<table><tr><th>ID</th><th>NAME</th><th>EMAIL</th></tr>";

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

            echo "<tr><td>" . $row["id"]. "</td><td>" . $row["name"]. "</td><td>" . $row["email"]. "</td></tr>";
        }
    } else {
        echo "0 results";
    }
    
    echo "</table>";

    $conn->close();
?>
