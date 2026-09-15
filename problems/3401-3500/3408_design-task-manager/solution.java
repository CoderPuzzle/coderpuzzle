import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class TaskManager {

    private final Map<Integer, long[]> tasks = new HashMap<>(); // taskId -> {priority, userId}
    private final PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> {
        if (a[0] != b[0]) {
            return Long.compare(b[0], a[0]); // higher priority first
        }
        return Long.compare(b[1], a[1]); // higher taskId first
    });

    public TaskManager(int[][] tasks) {
        for (int[] task : tasks) {
            this.tasks.put(task[1], new long[] { task[2], task[0] });
            heap.offer(new long[] { task[2], task[1], task[0] });
        }
    }

    public void add(int userId, int taskId, int priority) {
        tasks.put(taskId, new long[] { priority, userId });
        heap.offer(new long[] { priority, taskId, userId });
    }

    public void edit(int taskId, int newPriority) {
        long[] record = tasks.get(taskId);
        record[0] = newPriority;
        heap.offer(new long[] { newPriority, taskId, record[1] });
    }

    public void rmv(int taskId) {
        tasks.remove(taskId);
    }

    public int execTop() {
        while (!heap.isEmpty()) {
            long[] top = heap.peek();
            long[] record = tasks.get((int) top[1]);
            if (record != null && record[0] == top[0]) {
                heap.poll();
                tasks.remove((int) top[1]);
                return (int) top[2];
            }
            heap.poll();
        }
        return -1;
    }
}
