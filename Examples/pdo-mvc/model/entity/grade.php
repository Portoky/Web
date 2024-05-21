<?php

class Grade implements JsonSerializable {
	private $course;
	private $grade;

	public function __construct($course, $grade) {
		$this->course = $course;
		$this->grade = $grade;
	}

	public function getCourse() {
		return $this->course;
	}
	public function getGrade() {
		return $this->grade;
	}
	public function setCourse($course) {
		$this->course = $course;
	}
	public function setGrade($grade) {
		$this->grade = $grade;
	}

	public function jsonSerialize() {
        $vars = get_object_vars($this);
        return $vars;
    }
}

?>
