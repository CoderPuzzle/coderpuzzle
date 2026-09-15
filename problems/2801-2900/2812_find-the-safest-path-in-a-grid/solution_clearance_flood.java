import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int maximumSafenessFactor(int[][] grid) {
        int n = grid.length;
        // Multi-source BFS from every hazard at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest hazard —
        // exactly the cell's clearance value.
        int[][] dist = new int[n][n];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, -1);
        }
        Deque<int[]> q = new ArrayDeque<>();
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    dist[r][c] = 0;
                    q.add(new int[] { r, c });
                }
            }
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0],
                c = cur[1];
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.add(new int[] { nr, nc });
                }
            }
        }

        // Kruskal-style flood: admit cells in descending clearance, uniting
        // each with its already-admitted 4-neighbors, and watch the corners.
        // Their union traces a real all-admitted path, so it can only happen
        // at a clearance the answer reaches — and the best route's bottleneck
        // cell closes it exactly, making the value being admitted the answer.
        Integer[] order = new Integer[n * n];
        for (int i = 0; i < n * n; i++) {
            order[i] = i;
        }
        java.util.Arrays.sort(order, (a, b) -> Integer.compare(dist[b / n][b % n], dist[a / n][a % n]));
        int[] parent = new int[n * n];
        int[] size = new int[n * n];
        for (int i = 0; i < n * n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        boolean[][] admitted = new boolean[n][n];
        for (int idx : order) {
            int r = idx / n,
                c = idx % n,
                v = dist[r][c];
            admitted[r][c] = true;
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && admitted[nr][nc]) {
                    int a = find(parent, idx),
                        b = find(parent, nr * n + nc);
                    if (a != b) {
                        if (size[a] < size[b]) {
                            int t = a;
                            a = b;
                            b = t;
                        }
                        parent[b] = a;
                        size[a] += size[b];
                    }
                }
            }
            if (find(parent, 0) == find(parent, n * n - 1)) {
                return v;
            }
        }
        // The whole grid admits in the end, so the corners always unite; 0
        // is just the fallback.
        return 0;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
