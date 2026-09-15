class TodoList {
    constructor() {}

    addTask(userId: number, taskDescription: string, dueDate: number, tags: string[]): number {}

    getAllTasks(userId: number): string[] {}

    getTasksForTag(userId: number, tag: string): string[] {}

    completeTask(userId: number, taskId: number) {}
}
