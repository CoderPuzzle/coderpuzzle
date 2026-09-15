import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int[][] buildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
        int[] rowOrder = topo(k, rowConditions);
        if (rowOrder == null) {
            return new int[0][];
        }
        int[] colOrder = topo(k, colConditions);
        if (colOrder == null) {
            return new int[0][];
        }
        // The two orders are independent; distinct vertices of a topo order
        // get distinct positions, so every required pair stays strictly
        // ordered when v is placed at (rowPos[v], colPos[v]).
        int[] rowPos = new int[k + 1];
        int[] colPos = new int[k + 1];
        for (int i = 0; i < k; i++) {
            rowPos[rowOrder[i]] = i;
            colPos[colOrder[i]] = i;
        }
        int[][] matrix = new int[k][k];
        for (int v = 1; v <= k; v++) {
            matrix[rowPos[v]][colPos[v]] = v;
        }
        return matrix;
    }

    // Kahn's algorithm over the condition graph. Duplicate conditions only
    // add parallel edges and matching indegrees — harmless.
    private int[] topo(int k, int[][] conditions) {
        int[] indeg = new int[k + 1];
        int[][] adj = new int[k + 1][];
        int[] cnt = new int[k + 1];
        for (int[] c : conditions) {
            cnt[c[0]]++;
        }
        for (int v = 1; v <= k; v++) {
            adj[v] = new int[cnt[v]];
        }
        int[] fill = new int[k + 1];
        for (int[] c : conditions) {
            adj[c[0]][fill[c[0]]++] = c[1];
            indeg[c[1]]++;
        }
        Queue<Integer> queue = new ArrayDeque<>();
        for (int v = 1; v <= k; v++) {
            if (indeg[v] == 0) {
                queue.add(v);
            }
        }
        int[] order = new int[k];
        int idx = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order[idx++] = u;
            for (int w : adj[u]) {
                if (--indeg[w] == 0) {
                    queue.add(w);
                }
            }
        }
        // Fewer than k vertices peeled means a cycle: no valid order.
        if (idx != k) {
            return null;
        }
        return order;
    }
}
