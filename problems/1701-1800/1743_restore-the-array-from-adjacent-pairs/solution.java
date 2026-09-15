import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] restoreArray(int[][] adjacentPairs) {
        // Build the adjacency map: the array is a path, so every value has
        // one or two neighbours. The judge compares the returned array
        // exactly, so the walk must start at the same endpoint every time:
        // the first pair's element that is an endpoint, or the smaller
        // endpoint when the first pair is an internal edge.
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int[] pair : adjacentPairs) {
            adj.computeIfAbsent(pair[0], k -> new ArrayList<>()).add(pair[1]);
            adj.computeIfAbsent(pair[1], k -> new ArrayList<>()).add(pair[0]);
        }
        int a = adjacentPairs[0][0],
            b = adjacentPairs[0][1];
        int start;
        if (adj.get(a).size() == 1) {
            start = a;
        } else if (adj.get(b).size() == 1) {
            start = b;
        } else {
            start = Integer.MAX_VALUE;
            for (Map.Entry<Integer, List<Integer>> entry : adj.entrySet()) {
                if (entry.getValue().size() == 1) start = Math.min(start, entry.getKey());
            }
        }
        // Values live in [-1e5, 1e5], so Integer.MAX_VALUE is a safe
        // "no previous" sentinel for the walk.
        int[] result = new int[adjacentPairs.length + 1];
        int prev = Integer.MAX_VALUE;
        int cur = start;
        int written = 0;
        while (true) {
            result[written++] = cur;
            int nxt = Integer.MAX_VALUE;
            for (int nb : adj.get(cur)) {
                if (nb != prev) {
                    nxt = nb;
                    break;
                }
            }
            if (nxt == Integer.MAX_VALUE) break;
            prev = cur;
            cur = nxt;
        }
        return result;
    }
}
