#include <algorithm>
#include <string>
#include <vector>

class TodoList {
  public:
    // One vector indexed by the sequential task id (index = id - 1)
    // holds every task; the getters scan it for the user's uncompleted
    // tasks and sort the survivors by their unique due date.
    TodoList() {}

    int addTask(int userId, string taskDescription, int dueDate, vector<string> tags) {
        tasks_.push_back(Task{userId, std::move(taskDescription), dueDate, {tags.begin(), tags.end()}, false});
        return (int)tasks_.size();
    }

    vector<string> getAllTasks(int userId) { return collect(userId, nullptr); }

    vector<string> getTasksForTag(int userId, string tag) { return collect(userId, &tag); }

    void completeTask(int userId, int taskId) {
        if (taskId <= 0 || taskId > (int)tasks_.size())
            return;
        Task &task = tasks_[taskId - 1];
        if (task.user == userId && !task.done)
            task.done = true;
    }

  private:
    struct Task {
        int user;
        string description;
        int due;
        vector<string> tags;
        bool done;
    };

    vector<Task> tasks_;

    // Empty tag pointer means "ignore tags"; otherwise require membership.
    vector<string> collect(int userId, const string *tag) {
        vector<const Task *> pending;
        for (const Task &task : tasks_) {
            if (task.user != userId || task.done)
                continue;
            if (tag != nullptr && std::find(task.tags.begin(), task.tags.end(), *tag) == task.tags.end()) {
                continue;
            }
            pending.push_back(&task);
        }
        std::sort(pending.begin(), pending.end(), [](const Task *a, const Task *b) { return a->due < b->due; });
        vector<string> result;
        result.reserve(pending.size());
        for (const Task *task : pending)
            result.push_back(task->description);
        return result;
    }
};
