<?php

require_once '../repo/DBUtils.php';
require_once 'entity/student.php';
require_once 'entity/grade.php';


class Model {
	private $db;

	public function __construct() {
		$this->db = new DBUtils ();
	}

	public function getStudent($studentName) {
		$resultset = $this->db->selectStudent($studentName);
	    //var_dump($resultset);
        $student = new Student($resultset[0]['id'], $resultset[0]['name'], $resultset[0]['password'], $resultset[0]['group_id']);
        return $student;
	}

	public function getAllStudentsWithGrades() {
		$resultset = $this->db->selectAllStudents();
		$students = array();
		foreach($resultset as $key=>$val) {
			$stud = $val;

	    	$grades = $this->db->selectGradesForStudent($stud['id']);
	    	$stud['grades'] = array();
	    	foreach($grades as $g) {
	    		$grade = new Grade($g['course'], $g['grade']);
	    		array_push ($stud['grades'], $grade);
	    	} 

	    	array_push($students, $stud);
		}

	    return $students;
	}

	public function getAllStudents() {
		$resultset = $this->db->selectAllStudents();
		$students = array();
		foreach($resultset as $key=>$val) {
			$stud = new Student($val['id'], $val['name'], $val['password'], $val['group_id']);
	    	array_push($students, $stud);
		}

	    return $students;
	}

	public function getStudentGrades($studentName) {
		$resultset = $this->db->selectStudent($studentName);
		$gradesRset = $this->db->selectGradesForStudent($resultset[0]['id']);
	    $grades = array();
	    foreach($gradesRset as $g) {
	    		$grade = new Grade($g['course'], $g['grade']);
	    		array_push ($grades, $grade);
	    	} 
	}

	public function addGradeForStudent($studentid, $course, $grade) {
		return $this->db->addGradeForStudent($studentid, $course, $grade);
	}

	public function updateGradeForStudent($studentid, $course, $grade) {
		return $this->db->updateGradeForStudent($studentid, $course, $grade);
	}

	public function removeGradeForStudent($studentid, $course) {
		return $this->db->removeGradeForStudent($studentid, $course);
	}

}

?>
