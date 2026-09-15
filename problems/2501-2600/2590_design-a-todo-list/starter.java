class TodoList {

    public TodoList() {}

    public int addTask(int userId, String taskDescription, int dueDate, String[] tags) {}

    public String[] getAllTasks(int userId) {}

    public String[] getTasksForTag(int userId, String tag) {}

    public void completeTask(int userId, int taskId) {}
}
