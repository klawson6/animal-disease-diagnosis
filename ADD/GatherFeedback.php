<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$hostname = "devweb2019.cis.strath.ac.uk";

$username = "xsb16116";

$password = "kiaf1Eifoo2e";

$dbname = "xsb16116";

$response = "";

// Try to connect to Database
$con = mysqli_connect($hostname, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    // Could not connect to the Database
    die('Failed to connect to MySQL' . mysqli_connect_error());
}

$body  = file_get_contents('php://input');

$feedback  = json_decode($_POST["feedback"]);

$feedback1  = $feedback->feedback1;
$feedback2  = $feedback->feedback2;
$feedback3   = $feedback->feedback3;
$feedback4  = $feedback->feedback4;
$feedback5   = $feedback->feedback5;
$feedback6   = $feedback->feedback6;

//echo "\r\n".$uuid.$name.$date.$loc.$spec.$age.$breed.$sex.$diag;

$currentDir      = getcwd();
$uploadDirectory = "/kyle/images/";

$fbTable = "Feedback";

if ($stmt = $con->prepare("INSERT INTO $fbTable (Feedback1, Feedback2, Feedback3, Feedback4, Feedback5, Feedback6) VALUES (?,?,?,?,?,?)")) {
    $stmt->bind_param("iiiiss", $feedback1, $feedback2, $feedback3, $feedback4, $feedback5, $feedback6);
    if ($stmt->execute()) {
        $response = $response . "Case info uploaded." . "\r\n";
    } else {
        echo $stmt->error;
    }
    $stmt->close();
}

$con->close();

?>
