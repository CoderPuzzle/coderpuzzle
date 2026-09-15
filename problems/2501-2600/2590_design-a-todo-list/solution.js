// One map keyed by the sequential task id holds every task; the getters
// scan it for the user's uncompleted tasks and sort the survivors by
// their unique due date.
class TodoList {
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
    }

    addTask(userId, taskDescription, dueDate, tags) {
        const taskId = this.nextId++;
        this.tasks.set(taskId, {
            user: userId,
            description: taskDescription,
            due: dueDate,
            tags,
            done: false,
        });
        return taskId;
    }

    getAllTasks(userId) {
        const pending = [];
        for (const task of this.tasks.values()) {
            if (task.user === userId && !task.done) pending.push(task);
        }
        pending.sort((a, b) => a.due - b.due);
        return pending.map((task) => task.description);
    }

    getTasksForTag(userId, tag) {
        const pending = [];
        for (const task of this.tasks.values()) {
            if (task.user === userId && !task.done && task.tags.includes(tag)) {
                pending.push(task);
            }
        }
        pending.sort((a, b) => a.due - b.due);
        return pending.map((task) => task.description);
    }

    completeTask(userId, taskId) {
        const task = this.tasks.get(taskId);
        if (task && task.user === userId && !task.done) task.done = true;
    }
}
