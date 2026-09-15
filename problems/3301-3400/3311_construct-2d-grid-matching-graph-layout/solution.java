import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] constructGridLayout(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        // 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
        int endpoint = -1;
        for (int v = 0; v < n && endpoint < 0; v++) {
            if (adj.get(v).size() == 1) {
                endpoint = v;
            }
        }
        if (endpoint >= 0) {
            boolean[] placed = new boolean[n];
            List<Integer> row = new ArrayList<>();
            row.add(endpoint);
            placed[endpoint] = true;
            int next = endpoint;
            while (next >= 0) {
                next = -1;
                for (int u : adj.get(row.get(row.size() - 1))) {
                    if (!placed[u]) {
                        next = u;
                    }
                }
                if (next >= 0) {
                    row.add(next);
                    placed[next] = true;
                }
            }
            int[][] result = new int[1][row.size()];
            for (int j = 0; j < row.size(); j++) {
                result[0][j] = row.get(j);
            }
            return result;
        }

        // Both dimensions >= 2: corners are exactly the degree-2 nodes, and
        // edges = 2n - (rows + cols), so rows + cols is known from n and E.
        int corner = -1;
        for (int v = 0; v < n && corner < 0; v++) {
            if (adj.get(v).size() == 2) {
                corner = v;
            }
        }
        int dimsSum = 2 * n - edges.length;
        int rows = 0;
        int cols = 0;
        for (int t = 1; t < dimsSum; t++) {
            if ((long) t * (dimsSum - t) == n) {
                rows = t;
                cols = dimsSum - t;
                break;
            }
        }
        for (int first : adj.get(corner)) {
            int[][] grid = build(adj, corner, first, rows, cols);
            if (grid != null) {
                return grid;
            }
        }
        return new int[0][];
    }

    private int[][] build(List<List<Integer>> adj, int corner, int first, int rows, int cols) {
        int n = adj.size();
        boolean[] placed = new boolean[n];
        int[] row0 = new int[cols];
        row0[0] = corner;
        row0[1] = first;
        placed[corner] = true;
        placed[first] = true;
        int length = 2;
        while (length < cols) {
            int w = row0[length - 1];
            int p = row0[length - 2];
            int next = -1;
            for (int u : adj.get(w)) {
                if (placed[u] || u == p) {
                    continue;
                }
                if (sharesNeighbor(adj, u, p, w)) {
                    continue;
                }
                if (next >= 0) {
                    return null;
                }
                next = u;
            }
            if (next < 0) {
                return null;
            }
            row0[length++] = next;
            placed[next] = true;
        }

        int[][] grid = new int[rows][];
        grid[0] = row0;
        for (int i = 1; i < rows; i++) {
            int[] prev = grid[i - 1];
            int[] row = new int[cols];
            int start = -1;
            for (int u : adj.get(prev[0])) {
                if (!placed[u]) {
                    if (start >= 0) {
                        return null;
                    }
                    start = u;
                }
            }
            if (start < 0) {
                return null;
            }
            row[0] = start;
            placed[start] = true;
            for (int j = 1; j < cols; j++) {
                int hit = -1;
                for (int u : adj.get(row[j - 1])) {
                    if (placed[u] || !contains(adj.get(prev[j]), u)) {
                        continue;
                    }
                    if (hit >= 0) {
                        return null;
                    }
                    hit = u;
                }
                if (hit < 0) {
                    return null;
                }
                row[j] = hit;
                placed[hit] = true;
            }
            grid[i] = row;
        }
        for (boolean flag : placed) {
            if (!flag) {
                return null;
            }
        }
        return grid;
    }

    private boolean sharesNeighbor(List<List<Integer>> adj, int u, int p, int w) {
        for (int z : adj.get(u)) {
            if (z == w) {
                continue;
            }
            for (int x : adj.get(p)) {
                if (z == x) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean contains(List<Integer> list, int value) {
        for (int item : list) {
            if (item == value) {
                return true;
            }
        }
        return false;
    }
}
