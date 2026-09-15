import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] validArrangement(int[][] pairs) {
        // Numbers are nodes, pairs are directed edges: the arrangement is an
        // Eulerian path (a walk using every edge exactly once).
        Map<Integer, List<Integer>> adj = new LinkedHashMap<>();
        Map<Integer, Integer> indeg = new HashMap<>();
        Map<Integer, Integer> outdeg = new LinkedHashMap<>();
        for (int[] p : pairs) {
            adj.computeIfAbsent(p[0], k -> new ArrayList<>()).add(p[1]);
            outdeg.merge(p[0], 1, Integer::sum);
            indeg.merge(p[1], 1, Integer::sum);
        }

        // The unique out-in == 1 node must start the walk; when all degrees
        // balance (Eulerian circuit) any edge-bearing node works — pairs[0][0].
        int start = pairs[0][0];
        for (int u : outdeg.keySet()) {
            if (outdeg.get(u) - indeg.getOrDefault(u, 0) == 1) {
                start = u;
                break;
            }
        }

        // Iterative Hierholzer (explicit stack — 1e5 edges would overflow
        // recursion): deepen while unused edges remain; a node joins `path`
        // only when stuck, so unwinding emits dead-ends first.
        Deque<Integer> stack = new ArrayDeque<>();
        List<Integer> path = new ArrayList<>();
        stack.push(start);
        while (!stack.isEmpty()) {
            int u = stack.peek();
            List<Integer> edges = adj.get(u);
            if (edges != null && !edges.isEmpty()) {
                stack.push(edges.remove(edges.size() - 1));
            } else {
                path.add(u);
                stack.pop();
            }
        }
        // Reversal restores walk order; consecutive nodes are the arranged pairs.
        Collections.reverse(path);

        int[][] res = new int[path.size() - 1][2];
        for (int i = 0; i + 1 < path.size(); i++) {
            res[i][0] = path.get(i);
            res[i][1] = path.get(i + 1);
        }
        return res;
    }
}
