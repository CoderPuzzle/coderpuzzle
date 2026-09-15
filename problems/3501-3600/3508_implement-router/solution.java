import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Router {

    private static long pairKey(int source, int destination) {
        return source * 200_001L + destination;
    }

    // three parallel views of the stored packets: FIFO order, duplicate
    // detection, and an append-only timestamp log per destination
    private final int limit;
    private final Deque<int[]> queue = new ArrayDeque<>();
    private final Map<Long, Set<Integer>> stored = new HashMap<>();
    private final Map<Integer, List<Integer>> timestamps = new HashMap<>();
    private final Map<Integer, Integer> heads = new HashMap<>();

    public Router(int memoryLimit) {
        this.limit = memoryLimit;
    }

    public boolean addPacket(int source, int destination, int timestamp) {
        long pair = pairKey(source, destination);
        Set<Integer> seen = stored.computeIfAbsent(pair, key -> new HashSet<>());
        if (seen.contains(timestamp)) {
            return false;
        }
        if (queue.size() == limit) {
            // the oldest packet leaves all three views; its log entry is only
            // abandoned past the head, never shifted out of the list
            int[] oldest = queue.pollFirst();
            stored.get(pairKey(oldest[0], oldest[1])).remove(oldest[2]);
            heads.merge(oldest[1], 1, Integer::sum);
        }
        queue.addLast(new int[] { source, destination, timestamp });
        seen.add(timestamp);
        timestamps.computeIfAbsent(destination, key -> new ArrayList<>()).add(timestamp);
        heads.putIfAbsent(destination, 0);
        return true;
    }

    public int[] forwardPacket() {
        // forwarding hands over the oldest packet and drops it from every view
        int[] oldest = queue.pollFirst();
        if (oldest == null) {
            return new int[0];
        }
        stored.get(pairKey(oldest[0], oldest[1])).remove(oldest[2]);
        heads.merge(oldest[1], 1, Integer::sum);
        return oldest;
    }

    public int getCount(int destination, int startTime, int endTime) {
        List<Integer> times = timestamps.get(destination);
        if (times == null) {
            return 0;
        }
        // adds arrive with non-decreasing timestamps, so each log is sorted
        // for free and the live entries are the suffix [head, size)
        int head = heads.get(destination);
        int low = lowerBound(times, head, times.size(), startTime);
        int high = upperBound(times, head, times.size(), endTime);
        return high - low;
    }

    private int lowerBound(List<Integer> times, int from, int to, int target) {
        while (from < to) {
            int middle = (from + to) >>> 1;
            if (times.get(middle) < target) {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        return from;
    }

    private int upperBound(List<Integer> times, int from, int to, int target) {
        while (from < to) {
            int middle = (from + to) >>> 1;
            if (times.get(middle) <= target) {
                from = middle + 1;
            } else {
                to = middle;
            }
        }
        return from;
    }
}
