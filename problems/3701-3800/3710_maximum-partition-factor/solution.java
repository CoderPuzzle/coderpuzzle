import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int maxPartitionFactor(int[][] points) {
        int n = points.length;
        // Both groups are singletons, so no intra-group pair exists and the
        // factor is 0 by definition.
        if (n == 2) {
            return 0;
        }
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            }
        }
        // The factor of any split is 0 or one of the inter-point distances,
        // so binary search probes those candidate thresholds only.
        int[] candidates = new int[(n * (n - 1)) / 2 + 1];
        candidates[0] = 0;
        int count = 1;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                candidates[count++] = dist[i][j];
            }
        }
        Arrays.sort(candidates);
        int uniqueCount = 1;
        for (int i = 1; i < candidates.length; i++) {
            if (candidates[i] != candidates[uniqueCount - 1]) {
                candidates[uniqueCount++] = candidates[i];
            }
        }
        // Raising the threshold only adds conflict edges, so feasibility is
        // monotone and the largest separable threshold is the answer.
        int lo = 0,
            hi = uniqueCount - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (separable(dist, n, candidates[mid])) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return candidates[lo];
    }

    // Every pair closer than limit must be split across the two groups --
    // exactly "the conflict graph is bipartite".
    private boolean separable(int[][] dist, int n, int limit) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int u = 0; u < n; u++) {
            List<Integer> row = new ArrayList<>();
            for (int v = 0; v < n; v++) {
                if (v != u && dist[u][v] < limit) {
                    row.add(v);
                }
            }
            adj.add(row);
        }
        int[] color = new int[n];
        Arrays.fill(color, -1);
        int[] stack = new int[n];
        for (int start = 0; start < n; start++) {
            if (color[start] != -1) {
                continue;
            }
            color[start] = 0;
            int top = 0;
            stack[top++] = start;
            while (top > 0) {
                int u = stack[--top];
                for (int v : adj.get(u)) {
                    if (color[v] == -1) {
                        color[v] = color[u] ^ 1;
                        stack[top++] = v;
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
