import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long finishTime(int n, int[][] edges, int[] baseTime) {
        // Rerooting DP: down[] finishes each side with the parent direction
        // excluded, up[] mirrors the value flowing back from the parent side.
        // Answers reach n * max(baseTime) = 10^10, so all values stay long.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) adjacency.add(new ArrayList<>());
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        parent[0] = -2;
        int[] order = new int[n];
        int tail = 1;
        for (int head = 0; head < tail; head++) {
            for (int next : adjacency.get(order[head])) {
                if (parent[next] == -1) {
                    parent[next] = order[head];
                    order[tail++] = next;
                }
            }
        }
        long[] down = new long[n];
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            long low = Long.MAX_VALUE;
            long high = Long.MIN_VALUE; // smallest / largest finish among children
            for (int w : adjacency.get(v)) {
                if (w != parent[v]) {
                    low = Math.min(low, down[w]);
                    high = Math.max(high, down[w]);
                }
            }
            // A leaf role stops at the task's own duration.
            down[v] = low == Long.MAX_VALUE ? baseTime[v] : high + (high - low) + baseTime[v];
        }
        long[] up = new long[n];
        long best = Long.MAX_VALUE;
        for (int step = 0; step < n; ++step) {
            int v = order[step];
            List<Long> incoming = new ArrayList<>(); // values flowing into v
            Map<Integer, Integer> slots = new HashMap<>(); // child -> its slot
            for (int w : adjacency.get(v)) {
                if (w != parent[v]) {
                    slots.put(w, incoming.size());
                    incoming.add(down[w]);
                }
            }
            if (v != 0) incoming.add(up[v]);
            if (incoming.isEmpty()) return baseTime[v]; // n == 1: lone task as root
            // Two smallest / two largest entries, positions kept apart so one
            // branch can be excluded without losing a duplicated extreme.
            long low1 = Long.MAX_VALUE,
                low2 = Long.MAX_VALUE;
            long high1 = Long.MIN_VALUE,
                high2 = Long.MIN_VALUE;
            int lowSlot = -1;
            int highSlot = -1;
            for (int i = 0; i < incoming.size(); ++i) {
                long value = incoming.get(i);
                if (value < low1) {
                    low2 = low1;
                    low1 = value;
                    lowSlot = i;
                } else if (value < low2) {
                    low2 = value;
                }
                if (value > high1) {
                    high2 = high1;
                    high1 = value;
                    highSlot = i;
                } else if (value > high2) {
                    high2 = value;
                }
            }
            best = Math.min(best, high1 + (high1 - low1) + baseTime[v]);
            for (Map.Entry<Integer, Integer> entry : slots.entrySet()) {
                int child = entry.getKey();
                int slot = entry.getValue();
                long restLow = slot == lowSlot ? low2 : low1;
                long restHigh = slot == highSlot ? high2 : high1;
                if (incoming.size() == 1) {
                    // Without this branch the neighbour plays a leaf role.
                    up[child] = baseTime[v];
                } else {
                    up[child] = restHigh + (restHigh - restLow) + baseTime[v];
                }
            }
        }
        return best;
    }
}
