import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class TodoList {

    // One list indexed by the sequential task id (index = id - 1) holds
    // every task; the getters scan it for the user's uncompleted tasks
    // and sort the survivors by their unique due date.
    private static final class Task {

        final int user;
        final String description;
        final int due;
        final List<String> tags;
        boolean done;

        Task(int user, String description, int due, List<String> tags) {
            this.user = user;
            this.description = description;
            this.due = due;
            this.tags = tags;
        }
    }

    private final List<Task> tasks = new ArrayList<>();

    public TodoList() {}

    public int addTask(int userId, String taskDescription, int dueDate, String[] tags) {
        tasks.add(new Task(userId, taskDescription, dueDate, Arrays.asList(tags)));
        return tasks.size();
    }

    public String[] getAllTasks(int userId) {
        return collect(userId, null);
    }

    public String[] getTasksForTag(int userId, String tag) {
        return collect(userId, tag);
    }

    public void completeTask(int userId, int taskId) {
        if (taskId <= 0 || taskId > tasks.size()) return;
        Task task = tasks.get(taskId - 1);
        if (task.user == userId && !task.done) task.done = true;
    }

    // Null needle means "ignore tags"; otherwise require exact membership.
    private String[] collect(int userId, String needle) {
        List<Task> pending = new ArrayList<>();
        for (Task task : tasks) {
            if (task.user != userId || task.done) continue;
            if (needle != null && !task.tags.contains(needle)) continue;
            pending.add(task);
        }
        pending.sort((a, b) -> Integer.compare(a.due, b.due));
        String[] result = new String[pending.size()];
        for (int i = 0; i < pending.size(); ++i) result[i] = pending.get(i).description;
        return result;
    }
}
