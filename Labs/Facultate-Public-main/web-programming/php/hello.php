<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>

 Ex 1: <br>
<?php
    echo "Hello World";
?>

<hr>

 Ex 2: <br>
<?php

    function myTest() {
        $helloText = "Hello World! <br/>";

        $i = 0;
        for ($i = 0; $i < 10; $i++) {
            echo $helloText;

        }
    }

    myTest();
?>

<hr>

 Ex 3: <br>


<?php
    $colors = array("red", "green", "blue", "yellow");

    foreach ($colors as $value) {
        echo "$value <br>";
    }
?>


<hr>

 </body>
</html>