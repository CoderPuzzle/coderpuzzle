import "sort"

// One slice indexed by the sequential task id (index = id - 1) holds
// every task; the getters scan it for the user's uncompleted tasks and
// sort the survivors by their unique due date.
type TodoList struct {
	tasks  []todoTask
	nextID int
}

type todoTask struct {
	user        int
	description string
	due         int
	tags        []string
	done        bool
}

func NewTodoListTyped() *TodoList {
	return &TodoList{nextID: 1}
}

func (design *TodoList) addTask(userId int, taskDescription string, dueDate int, tags []string) int {
	id := design.nextID
	design.nextID++
	copyTags := append([]string(nil), tags...)
	design.tasks = append(design.tasks, todoTask{
		user:        userId,
		description: taskDescription,
		due:         dueDate,
		tags:        copyTags,
	})
	return id
}

func (design *TodoList) getAllTasks(userId int) []string {
	return design.collect(userId, "")
}

func (design *TodoList) getTasksForTag(userId int, tag string) []string {
	return design.collect(userId, tag)
}

func (design *TodoList) completeTask(userId int, taskId int) {
	if taskId <= 0 || taskId > len(design.tasks) {
		return
	}
	task := &design.tasks[taskId-1]
	if task.user == userId && !task.done {
		task.done = true
	}
}

// Empty needle matches everything; otherwise require exact membership.
func (design *TodoList) collect(userId int, needle string) []string {
	type entry struct {
		due         int
		description string
	}
	pending := []entry{}
	for _, task := range design.tasks {
		if task.user != userId || task.done {
			continue
		}
		if needle != "" && !containsString(task.tags, needle) {
			continue
		}
		pending = append(pending, entry{task.due, task.description})
	}
	sort.Slice(pending, func(i, j int) bool { return pending[i].due < pending[j].due })
	result := make([]string, len(pending))
	for i, e := range pending {
		result[i] = e.description
	}
	return result
}

func containsString(list []string, needle string) bool {
	for _, item := range list {
		if item == needle {
			return true
		}
	}
	return false
}
