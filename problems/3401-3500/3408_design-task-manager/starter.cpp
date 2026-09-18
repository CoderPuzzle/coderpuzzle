class TaskManager {
  public:
    TaskManager(vector<vector<int>> tasks);
    void add(int userId, int taskId, int priority);
    void edit(int taskId, int newPriority);
    void rmv(int taskId);
    int execTop();
};
