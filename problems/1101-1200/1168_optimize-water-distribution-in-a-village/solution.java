import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {
        // Kruskal over houses 1..n plus a virtual node 0 (well edges).
        List<int[]> edges = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            edges.add(new int[] { wells[i], 0, i + 1 });
        }
        for (int[] pipe : pipes) {
            edges.add(new int[] { pipe[2], pipe[0], pipe[1] });
        }
        edges.sort((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });

        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        int total = 0;
        int used = 0;
        for (int[] edge : edges) {
            int ra = find(parent, edge[1]);
            int rb = find(parent, edge[2]);
            if (ra != rb) {
                parent[ra] = rb;
                total += edge[0];
                used += 1;
                if (used == n) {
                    break;
                }
            }
        }
        return total;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
