<?php
// enable CORS - required for Angular UI
header("Access-Control-Allow-Origin: *");

require_once '../model/model.php';
require_once '../view/view.php';

class Controller
{
    private $view;
    private $model;	

    public function __construct(){
    	$this->model = new Model ();
        $this->view = new View();
    }

    public function service() {
	   if (isset($_GET['action']) && !empty($_GET['action'])) {
            if ($_GET['action'] == "getUser") {
   	            $this->{$_GET['action']}($_GET['user']);
            } else if ($_GET['action'] == "getAllGrades") {
                $this->{$_GET['action']}();
            } else if ($_GET['action'] == "getAllStudents") {
                $this->{$_GET['action']}();
            } else if ($_GET['action'] == "addGradeForStudent") {
                $this->{$_GET['action']}($_GET['studentid'], $_GET['course'], $_GET['grade']);
            } else if ($_GET['action'] == "updateGradeForStudent") {
                $this->{$_GET['action']}($_GET['studentid'], $_GET['course'], $_GET['grade']);
            } else if ($_GET['action'] == "removeGradeForStudent") {
                $this->{$_GET['action']}($_GET['studentid'], $_GET['course']);
            }
	   }
    }

    private function getUser($user) {
	   $student = $this->model->getStudent($user);
	   return $this->view->output($student);
    }

    private function getAllGrades() {
       $studentsWithGrades = $this->model->getAllStudentsWithGrades();
       return $this->view->output($studentsWithGrades);
    }

    private function getAllStudents() {
	$students = $this->model->getAllStudents();
	return $this->view->output($students);
    }

    private function addGradeForStudent($studentid, $course, $grade) {
        $result = $this->model->addGradeForStudent($studentid, $course, $grade);
        if ($result>0) { $r = "Success"; } 
        else { $r = "Failure"; }
        $this->view->returnResult($r);
    }

    private function updateGradeForStudent($studentid, $course, $grade) {
        $result = $this->model->updateGradeForStudent($studentid, $course, $grade);
        if ($result>0) { $r = "Success"; }
        else { $r = "Failure"; }
        $this->view->returnResult($r);
    }

    private function removeGradeForStudent($studentid, $course) {
        $result = $this->model->removeGradeForStudent($studentid, $course);
        if ($result>0) { $r = "Success"; }
        else { $r = "Failure"; }
        $this->view->returnResult($r);
    }

}

$controller = new Controller();
$controller->service();

?>
