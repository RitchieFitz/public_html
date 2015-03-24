<?php
	if (isset($_POST["read"])) {
		read_students();
	}
	else {
		register_student();
	}

	function register_student() {
		$type = $_POST["type"];
		$first = $_POST["first_name_1"];
		$last = $_POST["last_name_1"];
		$student_id = $_POST["student_id_1"];
		$skill = $_POST["skill_level"];
		$location = $_POST["location"];
		$room = $_POST["room"];
		$time_slot = $_POST["time_slot"];
		$instruments = $_POST["instruments"];
		$instruments = implode("::", $instruments);

		if (isset($_POST["first_name_2"])) {
			$second_first = $_POST["first_name_2"];
			$second_last = $_POST["last_name_2"];
			$second_student_id = $_POST["student_id_2"];

			$register_info = "$type::$first::$last::$student_id::";
			$register_info .= "$second_first::$second_last::$second_student_id::";
			$register_info .= "$skill::$location::$room::$time_slot;;;$instruments;;;2\n";
		}
		else {
			$register_info = "$type::$first::$last::$student_id::$skill::$location::$room::$time_slot;;;$instruments;;;1\n";
		}

		$register_file = fopen("register.txt", "a+") or die("Unable to open file!");

		fwrite($register_file, $register_info);
		fclose($register_file);

		read_students();
	}

	function read_students() {
		$students = [];
		$handle = fopen("register.txt", "r");

		if ($handle) {
			while (($line = fgets($handle)) !== false) {
				$students[] = $line;
			}

			fclose($handle);
		} else {
    		echo "Error Reading File!";
		}

		// echo implode("??", $students);
		foreach ($students as $student) {
			echo $student;
		}
	}

?>