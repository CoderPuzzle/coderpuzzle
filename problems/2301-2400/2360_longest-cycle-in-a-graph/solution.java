import java.util.ArrayList;
import java.util.List;

class Solution {

    public int longestCycle(int[] edges) {
        int n = edges.length;
        // Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
        int[] color = new int[n];
        int[] step = new int[n];
        int timer = 1;
        int best = -1;
        for (int start = 0; start < n; start++) {
            if (color[start] != 0) continue;
            int node = start;
            List<Integer> path = new ArrayList<>();
            // Out-degree <= 1 means rho shapes: walk until dead-end (-1),
            // a finished node, or a node on the current walk (a cycle).
            while (node != -1 && color[node] == 0) {
                color[node] = 1;
                step[node] = timer;
                timer += 1;
                path.add(node);
                node = edges[node];
            }
            // Landing on color 1 means we looped back into this walk; the
            // cycle length is the steps taken since that node was stamped.
            if (node != -1 && color[node] == 1) {
                best = Math.max(best, timer - step[node]);
            }
            // Mark the whole walk finished so later starts never re-walk it.
            for (int v : path) color[v] = 2;
        }
        return best;
    }
}
