import java.util.*;

class Solution {

    public int maximumMinimumPath(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        // Kruskal-style admission: switch cells on biggest-first and stop the
        // moment the two corners join one admitted component -- the value of
        // the cell admitted last is the widest bottleneck any walk can hold.
        List<int[]> cells = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                cells.add(new int[] { grid[r][c], r, c });
            }
        }
        // Falling order of value: the biggest cells are admitted first.
        cells.sort((a, b) -> Integer.compare(b[0], a[0]));
        int total = rows * cols;
        // parent[i] is -1 while cell i is unadmitted, else its union-find parent.
        int[] parent = new int[total];
        Arrays.fill(parent, -1);
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int[] cell : cells) {
            int value = cell[0];
            int r = cell[1];
            int c = cell[2];
            int idx = r * cols + c;
            // Admit the cell: it becomes its own root, then merges with every
            // already-admitted neighbour.
            parent[idx] = idx;
            for (int[] dir : dirs) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int nidx = nr * cols + nc;
                    if (parent[nidx] != -1) {
                        int ra = find(parent, idx);
                        int rb = find(parent, nidx);
                        if (ra != rb) {
                            parent[ra] = rb;
                        }
                    }
                }
            }
            if (find(parent, 0) == find(parent, total - 1)) {
                return value;
            }
        }
        // The full grid is connected, so the loop always returns inside.
        return 0;
    }

    // An unadmitted cell is its own isolated root; path halving keeps the
    // forest nearly flat.
    private int find(int[] parent, int i) {
        if (parent[i] == -1) {
            return i;
        }
        while (parent[i] != i) {
            parent[i] = parent[parent[i]];
            i = parent[i];
        }
        return i;
    }
}
