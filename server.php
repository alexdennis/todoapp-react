<?php

class TodoApp {
    private $rawJson;

    public function __construct() {
        $this->rawJson = file_get_contents('todos.json');
    }

    public function add($todo) {
        $todos = json_decode($this->rawJson, true);
        $todo['id'] = count($todos) + 1;
        $todos[] = $todo;        
        $this->persist($todos);
    }

    public function update($id, $todo) {
        $todos = json_decode($this->rawJson, true);
        if (!empty($todos[$id-1])) {
            $todos[$id-1] = $todo;
            $this->persist($todos);
            return;
        }
    }

    public function persist($todos) {
        $this->rawJson = json_encode($todos);
        file_put_contents('todos.json', $this->rawJson);
    }

    public function __toString() {
        return $this->rawJson;
    }

}

$t = new TodoApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $todo = json_decode(file_get_contents('php://input'), true);
        $t->add($todo);
        break;
    case 'PUT':
        $id = $_GET['id'];
        $todo = json_decode(file_get_contents('php://input'), true);
        $t->update($id, $todo);
        break;
}

echo $t;