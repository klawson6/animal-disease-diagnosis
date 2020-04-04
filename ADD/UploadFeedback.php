<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$hostname = "devweb2019.cis.strath.ac.uk";

$username = "xsb16116";

$password = "kiaf1Eifoo2e";

$dbname = "xsb16116";

$response =  new \stdClass();;

// Try to connect to Database
$con = mysqli_connect($hostname, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    // Could not connect to the Database
    die('Failed to connect to MySQL' . mysqli_connect_error());
}

$body = file_get_contents('php://input');

if (!(isset($_POST["feedback"]))) {
    $response->feedback = isset($_POST["feedback"]);
    echo json_encode($response);
    exit(0);
}

$feedback = json_decode($_POST["feedback"]);

if (!(isset($feedback->feedback1) && isset($feedback->feedback2) && isset($feedback->feedback3) && isset($feedback->feedback4) && isset($feedback->feedback5) && isset($feedback->feedback6))) {
    $response->data = $feedback;
    echo json_encode($response);
    exit(0);
}

$feedback1 = $feedback->feedback1;
$feedback2 = $feedback->feedback2;
$feedback3 = $feedback->feedback3;
$feedback4 = $feedback->feedback4;
$feedback5 = $feedback->feedback5;
$feedback6 = $feedback->feedback6;
$uuid = uniqid();

$currentDir = getcwd();
$uploadDirectory = "/kyle/images/";

$fbTable = "Feedback";

if ($stmt = $con->prepare("INSERT INTO $fbTable (Identifier, Feedback1, Feedback2, Feedback3, Feedback4, Feedback5, Feedback6) VALUES (?,?,?,?,?,?,?)")) {
    $stmt->bind_param("siiiiss", $uuid, $feedback1, $feedback2, $feedback3, $feedback4, $feedback5, $feedback6);
    if (!$stmt->execute()) {
        $response->error = 0;
        $response->errormsg = $stmt->error;
        echo json_encode($response);
        exit(0);    }
    $stmt->close();
}

echo json_encode($response);
$con->close();

?>
