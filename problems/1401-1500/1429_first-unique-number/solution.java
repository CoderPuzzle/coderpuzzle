import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

class FirstUnique {

    private final Map<Long, Integer> counts = new HashMap<>();
    private final Queue<Long> queue = new LinkedList<>();

    public FirstUnique(long[] nums) {
        for (long value : nums) {
            add(value);
        }
    }

    public long showFirstUnique() {
        while (!queue.isEmpty() && counts.get(queue.peek()) > 1) {
            queue.poll();
        }
        return queue.isEmpty() ? -1 : queue.peek();
    }

    public void add(long value) {
        counts.merge(value, 1, Integer::sum);
        queue.add(value);
    }
}
