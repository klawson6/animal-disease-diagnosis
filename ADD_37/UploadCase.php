<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$hostname = "devweb2019.cis.strath.ac.uk";

$username = "xsb16116";

$password = "kiaf1Eifoo2e";

$dbname = "xsb16116";

$response = new \stdClass();

// Try to connect to Database
$con = mysqli_connect($hostname, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    // Could not connect to the Database
    die('Failed to connect to MySQL' . mysqli_connect_error());
}

$body = file_get_contents('php://input');

if (!(isset($_POST["feedback"]) && isset($_POST["case"]) && isset($_FILES["images"]["name"]))) {
    $response->case = isset($_POST["case"]);
    $response->feedback = isset($_POST["feedback"]);
    $response->images = isset($_FILES["images"]["name"]);
    echo json_encode($response);
    exit(0);
}

$data = json_decode($_POST["case"]);

if (!(isset($data->identifier) && isset($data->dateSelected) && isset($data->location) && isset($data->species) && isset($data->age) && isset($data->sex) && isset($data->breed) && isset($data->diagnosis) && isset($data->type) && isset($data->sides))) {
    $response->data = $data;
    echo json_encode($response);
    exit(0);
}

if (count($_FILES['images']['name']) != count($data->sides)){
    $response->sides = $data->sides;
    $response->imgs = count($_FILES['images']['name']);
    echo json_encode($response);
    exit(0);
}

$name = $data->identifier;
$date = $data->dateSelected;
$loc = $data->location;
$spec = $data->species;
$age = $data->age;
$sex = $data->sex;
$breed = $data->breed;
$diag = $data->diagnosis;
$type = $data->type;
$uuid = uniqid("", TRUE);
$feedb = 0;

$currentDir = getcwd();
$uploadDirectory = "/kyle/images/";

$caseInfo = "CaseInfo";
$caseImages = "CaseImages";

if ($stmt = $con->prepare("INSERT INTO $caseInfo (CaseID, Identifier, Date_Observed, Location, Species, Age, Sex, Breed, Diagnosis, Type, Feedback) VALUES (?,?,?,?,?,?,?,?,?,?,?)")) {
    $stmt->bind_param("sssssiiisii", $uuid, $name, $date, $loc, $spec, $age, $breed, $sex, $diag, $type, $feedb);
    if (!$stmt->execute()) {
        $response->error = 0;
        $response->errormsg = $stmt->error;
        echo json_encode($response);
        exit(0);
    }
    $stmt->close();
}
try {

    $null = NULL;

    for ($x = 0; $x < count($_FILES['images']['name']); $x++) {
        // Check $_FILES['upfile']['error'] value.
        switch ($_FILES['images']['error'][$x]) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown errors.');
        }
        $fileName = $_FILES['images']['name'][$x];
        $fileSize = $_FILES['images']['size'][$x];
        $fileTmpName = $_FILES['images']['tmp_name'][$x];
        $fileType = $_FILES['images']['type'][$x];
        $side = $data->sides[$x];

        $imageBlob = file_get_contents($_FILES['images']['tmp_name'][$x]);
        $uploadPath = $currentDir . basename($fileName);

        $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

        if (!$didUpload) {
            throw new RuntimeException('Failed to move uploaded file.');
        }

        if ($stmt = $con->prepare("INSERT INTO $caseImages (CaseID, ImageID, Side, Image) VALUES (?,?,?,?)")) {
            $iid = $uuid . $fileName;
            $stmt->bind_param("ssib", $uuid, $iid, $side, $null);
            $stmt->send_long_data(3, $imageBlob);
            if (!($stmt->execute() && $didUpload)) {
                $response->error = 1;
                $response->errormsg = $stmt->error;
                echo json_encode($response);
                exit(0);
            }
        }
        $stmt->close();
    }
    $con->close();

    echo json_encode($response);
} catch (RuntimeException $e) {
    $response->error = 2;
    $response->errormsg = $e->getMessage();
    echo json_encode($response);
}

?>
