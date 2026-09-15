import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length;
        int cols = heights[0].length;
        // One edge per adjacent pair (right and down neighbor), endpoints
        // flattened to r*cols + c.
        List<int[]> edges = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (r + 1 < rows) {
                    int w = Math.abs(heights[r + 1][c] - heights[r][c]);
                    edges.add(new int[] { w, r * cols + c, (r + 1) * cols + c });
                }
                if (c + 1 < cols) {
                    int w = Math.abs(heights[r][c + 1] - heights[r][c]);
                    edges.add(new int[] { w, r * cols + c, r * cols + c + 1 });
                }
            }
        }
        // Ascending weight order is Kruskal's skeleton: the first edge that
        // joins the two corners is the minimum possible maximum.
        edges.sort((a, b) -> Integer.compare(a[0], b[0]));
        int total = rows * cols;
        parent = new int[total];
        size = new int[total];
        for (int i = 0; i < total; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        // A 1x1 grid is connected to itself from the start.
        if (find(0) == find(total - 1)) {
            return 0;
        }
        for (int[] edge : edges) {
            if (find(edge[1]) == find(edge[2])) {
                continue;
            }
            union(edge[1], edge[2]);
            // Once both corners share a component, every path between them
            // uses some edge of weight at least w, and w already suffices.
            if (find(0) == find(total - 1)) {
                return edge[0];
            }
        }
        return 0;
    }

    private int[] parent;
    private int[] size;

    private int find(int x) {
        // Path compression keeps later finds near O(1).
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a),
            rb = find(b);
        if (ra == rb) {
            return;
        }
        // Union by size keeps the trees shallow.
        if (size[ra] < size[rb]) {
            int tmp = ra;
            ra = rb;
            rb = tmp;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }
}
