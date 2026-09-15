import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    private final Map<Integer, List<Integer>> adj = new HashMap<>();

    public int[] findRedundantConnection(int[][] edges) {
        adj.clear();
        // A tree plus one extra edge has exactly one cycle; the first edge
        // that closes it is the one to remove.
        for (int[] edge : edges) {
            // Probe before inserting: if b is already reachable from a
            // through the edges added so far, this edge closes the cycle.
            if (connected(edge[0], edge[1])) {
                return edge;
            }
            // A safe edge joins two previously separate parts: register it
            // in both directions and keep scanning.
            adj.computeIfAbsent(edge[0], k -> new ArrayList<>()).add(edge[1]);
            adj.computeIfAbsent(edge[1], k -> new ArrayList<>()).add(edge[0]);
        }
        return new int[0];
    }

    private boolean connected(int a, int b) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(a);
        Set<Integer> seen = new HashSet<>();
        seen.add(a);
        // The stack explores depth-first and marks nodes on push, so each
        // node enters it at most once per probe.
        while (!stack.isEmpty()) {
            int u = stack.pop();
            if (u == b) {
                return true;
            }
            List<Integer> neighbors = adj.get(u);
            if (neighbors != null) {
                for (int v : neighbors) {
                    if (!seen.contains(v)) {
                        seen.add(v);
                        stack.push(v);
                    }
                }
            }
        }
        return false;
    }
}
