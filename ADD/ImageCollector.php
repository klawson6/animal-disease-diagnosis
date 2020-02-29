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

$data  = json_decode($_POST["case"]);

$name  = $data->name;
$date  = $data->dateSelected;
$loc   = $data->location;
$spec  = $data->species;
$age   = $data->age;
$sex   = $data->sex;
$breed = $data->breed;
$diag  = $data->diagnosis;
$type = $data->type;
$uuid  = uniqid();
$feedb = 0;

if($_POST["feedback"]){
    $feedb = $_POST["feedback"];
}
//echo "\r\n".$uuid.$name.$date.$loc.$spec.$age.$breed.$sex.$diag;

$currentDir      = getcwd();
$uploadDirectory = "/kyle/images/";

$caseInfo = "CaseInfo";
$caseImages = "CaseImages";

if ($stmt = $con->prepare("INSERT INTO $caseInfo (CaseID, Submitter_Name, Date_Observed, Location, Species, Age, Sex, Breed, Diagnosis, Type, Feedback) VALUES (?,?,?,?,?,?,?,?,?,?,?)")) {
    $stmt->bind_param("sssssiiisii", $uuid, $name, $date, $loc, $spec, $age, $breed, $sex, $diag, $type, $feedb);
    if ($stmt->execute()) {
        $response = $response . "Case info uploaded." . "\r\n";
    } else {
        echo $stmt->error;
    }
    $stmt->close();
}
try{

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
      $fileName    = $_FILES['images']['name'][$x];
      $fileSize    = $_FILES['images']['size'][$x];
      $fileTmpName = $_FILES['images']['tmp_name'][$x];
      $fileType    = $_FILES['images']['type'][$x];
      $side        = $data->sides[$x];

      $response = $response . "Name: " . $fileName . "\r\n";
      $response = $response . "Size: " . $fileSize . "\r\n";
      $response = $response . "TmpName: " . $fileTmpName . "\r\n";
      $response = $response . "Type: " . $fileType . "\r\n";
      $response = $response . "Side: " . $side . "\r\n";

      echo $response;

      $imageBlob = file_get_contents($_FILES['images']['tmp_name'][$x]);
      $response = $response . $imageBlob . "\r\n";
      $uploadPath = $currentDir . basename($fileName);

      $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

      if(!$didUpload){
        throw new RuntimeException('Failed to move uploaded file.');
      }

      if ($stmt = $con->prepare("INSERT INTO $caseImages (CaseID, ImageID, Side, Image) VALUES (?,?,?,?)")) {
          $iid = $uuid . $fileName;
          $stmt->bind_param("ssib", $uuid, $iid, $side, $null);
          $stmt->send_long_data(3, $imageBlob);
          if ($stmt->execute() && $didUpload) {
                $response = $response .  "The file " . basename($fileName) . " has been uploaded\r\n";
          } else {
                echo "An error occurred somewhere. Try again or contact the admin";
                echo $stmt->error;
          }
      }
      $stmt->close();
  }
  $con->close();

  echo $response;
} catch (RuntimeException $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>
