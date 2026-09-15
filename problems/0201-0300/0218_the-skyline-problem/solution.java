import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int[][] getSkyline(int[][] buildings) {
        // events: [x, kind, key, right]; key = -height for start, +height for end
        int m = buildings.length;
        int[][] events = new int[m * 2][4];
        for (int i = 0; i < m; i++) {
            int[] b = buildings[i];
            events[2 * i] = new int[] { b[0], 0, -b[2], b[1] };
            events[2 * i + 1] = new int[] { b[1], 1, b[2], b[1] };
        }
        // The 4-tuple ordering encodes the tie-breaking: starts (kind 0)
        // before ends (kind 1) at equal x so adjacent buildings hand off
        // without a dip to ground; taller starts first (-height); shorter
        // ends first so a tall building survives until its own right edge.
        Arrays.sort(events, (a, b) -> {
            for (int k = 0; k < 4; k++) {
                if (a[k] != b[k]) return Integer.compare(a[k], b[k]);
            }
            return 0;
        });

        // max-heap of (height, right) with lazy removal; sentinel ground level
        // (right kept as long so a building ending at Integer.MAX_VALUE can
        // never knock the sentinel out of the heap)
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));
        heap.offer(new long[] { 0, (long) Integer.MAX_VALUE + 1 });

        List<int[]> result = new ArrayList<>();
        int previousHeight = 0;
        for (int[] ev : events) {
            int x = ev[0],
                kind = ev[1],
                key = ev[2],
                right = ev[3];
            // Lazy removal: pop top entries whose building has ended; stale
            // entries below the top are harmless until they surface.
            while (!heap.isEmpty() && heap.peek()[1] <= x) {
                heap.poll();
            }
            if (kind == 0) {
                heap.offer(new long[] { -key, right });
            }
            int currentHeight = (int) heap.peek()[0];
            // Emit a key point only when the contour height actually changes,
            // which also merges consecutive equal-height segments.
            if (currentHeight != previousHeight) {
                result.add(new int[] { x, currentHeight });
                previousHeight = currentHeight;
            }
        }
        return result.toArray(new int[0][]);
    }
}
