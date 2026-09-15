import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] employeeFreeTime(int[][][] schedule) {
        // A moment is free exactly when no employee is busy, so only the
        // union matters: pool every interval, forgetting ownership.
        List<int[]> intervals = new ArrayList<>();
        for (int[][] employee : schedule) {
            for (int[] interval : employee) {
                intervals.add(interval);
            }
        }
        // Sorted by start (then end), the sweep meets busy blocks in order.
        intervals.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        List<int[]> free = new ArrayList<>();
        boolean started = false;
        int previousEnd = 0;
        for (int[] interval : intervals) {
            // Starting strictly beyond the furthest end seen so far proves
            // nothing covers (previousEnd, start); strictness keeps
            // touching intervals continuous (no zero-length gaps).
            if (started && interval[0] > previousEnd) {
                free.add(new int[] { previousEnd, interval[0] });
            }
            // Otherwise merge into the busy block, keeping the running max
            // of ends so a long interval absorbs shorter ones inside it.
            previousEnd = !started ? interval[1] : Math.max(previousEnd, interval[1]);
            started = true;
        }
        return free.toArray(new int[0][]);
    }
}
