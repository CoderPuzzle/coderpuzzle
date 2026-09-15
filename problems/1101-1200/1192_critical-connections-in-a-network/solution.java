import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    private int timerVal;
    private int[] disc;
    private int[] low;
    private List<List<Integer>> graph;
    private List<int[]> bridges;

    public int[][] criticalConnections(int n, int[][] connections) {
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] e : connections) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }
        disc = new int[n];
        low = new int[n];
        Arrays.fill(disc, -1);
        timerVal = 0;
        bridges = new ArrayList<>();
        // graph is connected, so one root reaches every server
        dfs(0, -1);
        // sort only for a deterministic output order
        bridges.sort((x, y) -> x[0] != y[0] ? Integer.compare(x[0], y[0]) : Integer.compare(x[1], y[1]));
        int[][] res = new int[bridges.size()][2];
        for (int i = 0; i < bridges.size(); i++) {
            res[i][0] = bridges.get(i)[0];
            res[i][1] = bridges.get(i)[1];
        }
        return res;
    }

    private void dfs(int u, int parent) {
        // Tarjan bridge finding: disc[u] is the DFS discovery time, low[u] the
        // earliest discovery reachable from u's subtree via tree edges plus at
        // most one back edge
        disc[u] = low[u] = timerVal++;
        for (int v : graph.get(u)) {
            if (disc[v] == -1) {
                dfs(v, u);
                // fold the child's reach upward
                low[u] = Math.min(low[u], low[v]);
                // bridge iff v's subtree cannot see past u: this tree edge
                // is the only route between the two sides
                if (low[v] > disc[u]) {
                    bridges.add(new int[] { Math.min(u, v), Math.max(u, v) });
                }
            } else if (v != parent) {
                // back edge to a non-parent ancestor relaxes low; skipping
                // the parent matters — that edge is the tree edge itself
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}
