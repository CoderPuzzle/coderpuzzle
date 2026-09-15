class TodoList {
  public:
    TodoList();
    int addTask(int userId, string taskDescription, int dueDate, vector<string> tags);
    vector<string> getAllTasks(int userId);
    vector<string> getTasksForTag(int userId, string tag);
    void completeTask(int userId, int taskId);
};
