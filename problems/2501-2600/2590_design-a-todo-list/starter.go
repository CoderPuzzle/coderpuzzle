package main

type TodoList struct{}

func NewTodoListTyped() *TodoList {
	panic("TODO")
}

func (design *TodoList) addTask(userId int, taskDescription string, dueDate int, tags []string) int {
	panic("TODO")
}

func (design *TodoList) getAllTasks(userId int) []string {
	panic("TODO")
}

func (design *TodoList) getTasksForTag(userId int, tag string) []string {
	panic("TODO")
}

func (design *TodoList) completeTask(userId int, taskId int) {
	panic("TODO")
}
