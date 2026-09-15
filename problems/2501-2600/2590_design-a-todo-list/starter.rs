pub struct TodoList;

impl TodoList {
    pub fn new() -> Self {
        panic!("TODO")
    }

    pub fn addTask(&mut self, userId: i32, taskDescription: String, dueDate: i32, tags: Vec<String>) -> i32 {
        panic!("TODO")
    }

    pub fn getAllTasks(&mut self, userId: i32) -> Vec<String> {
        panic!("TODO")
    }

    pub fn getTasksForTag(&mut self, userId: i32, tag: String) -> Vec<String> {
        panic!("TODO")
    }

    pub fn completeTask(&mut self, userId: i32, taskId: i32) {
        panic!("TODO")
    }
}
