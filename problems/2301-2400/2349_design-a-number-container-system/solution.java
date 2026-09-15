import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class NumberContainers {

    // index -> number currently filling it
    private final Map<Integer, Integer> slots = new HashMap<>();
    // number -> every index ever filled with it; stale entries are
    // discarded only when find() reaches them
    private final Map<Integer, PriorityQueue<Integer>> candidates = new HashMap<>();

    public NumberContainers() {}

    public void change(int index, int number) {
        Integer current = slots.get(index);
        if (current != null && current == number) {
            return;
        }
        slots.put(index, number);
        candidates.computeIfAbsent(number, key -> new PriorityQueue<>()).add(index);
    }

    public int find(int number) {
        PriorityQueue<Integer> heap = candidates.get(number);
        if (heap == null) {
            return -1;
        }
        // the top is the answer unless that index has since been refilled
        while (!heap.isEmpty() && slots.get(heap.peek()) != number) {
            heap.poll();
        }
        return heap.isEmpty() ? -1 : heap.peek();
    }
}
