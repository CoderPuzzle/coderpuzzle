package main

type TaskManager struct{}

func NewTaskManagerTyped(tasks [][]int) *TaskManager {
	panic("TODO")
}

func (design *TaskManager) add(userId int, taskId int, priority int) {
	panic("TODO")
}

func (design *TaskManager) edit(taskId int, newPriority int) {
	panic("TODO")
}

func (design *TaskManager) rmv(taskId int) {
	panic("TODO")
}

func (design *TaskManager) execTop() int {
	panic("TODO")
}
