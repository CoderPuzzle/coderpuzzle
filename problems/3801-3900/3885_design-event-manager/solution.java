import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class EventManager {

    // A lazy-deletion max-priority queue: every priority update pushes a
    // fresh entry, and pollHighest pops stale entries whose stored priority
    // no longer matches the live map value. The comparator orders by
    // priority descending, then eventId ascending.
    private final Map<Integer, Integer> priority = new HashMap<>();
    private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
        a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0])
    );

    public EventManager(int[][] events) {
        for (int[] event : events) {
            priority.put(event[0], event[1]);
            heap.add(new int[] { event[1], event[0] });
        }
    }

    public void updatePriority(int eventId, int newPriority) {
        priority.put(eventId, newPriority);
        heap.add(new int[] { newPriority, eventId });
    }

    public int pollHighest() {
        while (!heap.isEmpty()) {
            int[] entry = heap.poll();
            if (priority.getOrDefault(entry[1], -1) == entry[0]) {
                priority.remove(entry[1]);
                return entry[1];
            }
        }
        return -1;
    }
}
