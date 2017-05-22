<?php
class Appointment{

	private $id;
	private $user_id;
	private $created_at;
	private $date;

	function __construct($id,$user_id,$created_at,$date){
		$this->id = $id;
		$this->user_id = $user_id;
		$this->created_at = $created_at;
		$this->date = $date;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function setUserId($user_id){
		$this->user_id = $user_id;
	}

	public function setCreatedAt($created_at){
		$this->created_at = $created_at;
	}

	public function setDate($date){
		$this->date = $date;
	}

	public function getId(){
		return $this->id;
	}

	public function getUserId(){
		return $this->user_id;
	}

	public function getCreatedAt(){
		return $this->created_at;
	}

	public function getDate(){
		return $this->date;
	}
}
?>