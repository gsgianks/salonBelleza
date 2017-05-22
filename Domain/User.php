<?php 
class User{

	private $id;
	private $role;
	private $email;
	private $password;
/*
	function __construct(){
		$this->id = 0;
		$this->role = 0;
		$this->email = "";
		$this->password = "";
	}
*/	function __construct($id,$role,$email,$password){
		$this->id = $id;
		$this->role = $role;
		$this->email = $email;
		$this->password = $password;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function setRole($role){
		$this->role = $role;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function setPassword($password){
		$this->password = $password;
	}

	public function getId(){
		return $this->id;
	}

	public function getRole(){
		return $this->role;
	}

	public function getEmail(){
		return $this->email;
	}

	public function getPassword(){
		return $this->password;
	}
}


?>