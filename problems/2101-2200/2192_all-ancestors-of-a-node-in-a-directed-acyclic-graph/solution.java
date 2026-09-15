import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] getAncestors(int n, int[][] edges) {
        // Reverse every edge; ancestors of v are exactly the nodes
        // reachable from v in the reversed graph.
        List<List<Integer>> reverseAdj = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            reverseAdj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            reverseAdj.get(edge[1]).add(edge[0]);
        }
        int[][] answer = new int[n][];
        for (int start = 0; start < n; ++start) {
            boolean[] seen = new boolean[n];
            seen[start] = true;
            Deque<Integer> frontier = new ArrayDeque<>();
            frontier.addLast(start);
            while (!frontier.isEmpty()) {
                int node = frontier.pollFirst();
                for (int prev : reverseAdj.get(node)) {
                    if (!seen[prev]) {
                        seen[prev] = true;
                        frontier.addLast(prev);
                    }
                }
            }
            List<Integer> row = new ArrayList<>();
            for (int u = 0; u < n; ++u) {
                if (seen[u] && u != start) {
                    row.add(u);
                }
            }
            answer[start] = row.stream().mapToInt(Integer::intValue).toArray();
        }
        return answer;
    }
}
