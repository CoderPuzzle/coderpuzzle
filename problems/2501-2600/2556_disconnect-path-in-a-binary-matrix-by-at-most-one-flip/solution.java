import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean isPossibleToCutPath(int[][] grid) {
        // Only a 1->0 flip can ever help, so the game is decided by
        // vertex cuts of the monotone 1-cell DAG: at most one flip
        // succeeds exactly when fewer than two vertex-disjoint
        // corner-to-corner paths exist (Menger). Unit vertex capacities
        // come from the standard in/out split; cells off any
        // root-to-corner route are skipped outright. Augmenting BFS
        // stops early once flow 2 proves the answer false, so at most
        // two searches ever run.
        int m = grid.length;
        int n = grid[0].length;
        int count = m * n;
        int inf = count + 2;
        List<Integer> arcsTo = new ArrayList<>();
        List<Integer> arcsCap = new ArrayList<>();
        List<List<Integer>> graph = new ArrayList<>(2 * count);
        for (int v = 0; v < 2 * count; v++) {
            graph.add(new ArrayList<>());
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) continue;
                int cell = i * n + j;
                boolean corner = (i == 0 && j == 0) || (i == m - 1 && j == n - 1);
                connect(graph, arcsTo, arcsCap, 2 * cell, 2 * cell + 1, corner ? inf : 1);
                if (j + 1 < n && grid[i][j + 1] == 1) {
                    connect(graph, arcsTo, arcsCap, 2 * cell + 1, 2 * (cell + 1), inf);
                }
                if (i + 1 < m && grid[i + 1][j] == 1) {
                    connect(graph, arcsTo, arcsCap, 2 * cell + 1, 2 * (cell + n), inf);
                }
            }
        }
        int source = 0;
        int sink = 2 * (count - 1) + 1;
        int total = 0;
        while (total < 2) {
            int[] parent = new int[2 * count];
            int[] via = new int[2 * count];
            java.util.Arrays.fill(parent, -1);
            java.util.Arrays.fill(via, -1);
            Deque<Integer> queue = new ArrayDeque<>();
            parent[source] = source;
            queue.add(source);
            while (!queue.isEmpty() && parent[sink] == -1) {
                int u = queue.poll();
                for (int e : graph.get(u)) {
                    if (parent[sink] != -1) break;
                    int v = arcsTo.get(e);
                    if (arcsCap.get(e) > 0 && parent[v] == -1) {
                        parent[v] = u;
                        via[v] = e;
                        queue.add(v);
                    }
                }
            }
            if (parent[sink] == -1) break;
            int v = sink;
            while (v != source) {
                int e = via[v];
                arcsCap.set(e, arcsCap.get(e) - 1);
                arcsCap.set(e ^ 1, arcsCap.get(e ^ 1) + 1);
                v = parent[v];
            }
            total++;
        }
        return total < 2;
    }

    private void connect(
        List<List<Integer>> graph,
        List<Integer> arcsTo,
        List<Integer> arcsCap,
        int u,
        int v,
        int cap
    ) {
        graph.get(u).add(arcsTo.size());
        arcsTo.add(v);
        arcsCap.add(cap);
        graph.get(v).add(arcsTo.size());
        arcsTo.add(u);
        arcsCap.add(0);
    }
}
