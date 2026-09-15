import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int numDistinctIslands(int[][] grid) {
        // Flood-fill each island with an explicit queue. The shape is the
        // sorted list of cells relative to the first cell the row-major scan
        // meets, so translated copies produce one identical signature.
        int m = grid.length,
            n = grid[0].length;
        boolean[][] seen = new boolean[m][n];
        Set<String> shapes = new HashSet<>();
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] != 1 || seen[i][j]) {
                    continue;
                }
                seen[i][j] = true;
                ArrayDeque<int[]> queue = new ArrayDeque<>();
                queue.add(new int[] { i, j });
                List<int[]> cells = new ArrayList<>();
                while (!queue.isEmpty()) {
                    int[] cell = queue.poll();
                    int r = cell[0],
                        c = cell[1];
                    cells.add(new int[] { r - i, c - j });
                    int[][] neighbours = { { r - 1, c }, { r + 1, c }, { r, c - 1 }, { r, c + 1 } };
                    for (int[] nb : neighbours) {
                        if (
                            nb[0] >= 0 &&
                            nb[0] < m &&
                            nb[1] >= 0 &&
                            nb[1] < n &&
                            grid[nb[0]][nb[1]] == 1 &&
                            !seen[nb[0]][nb[1]]
                        ) {
                            seen[nb[0]][nb[1]] = true;
                            queue.add(nb);
                        }
                    }
                }
                cells.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
                StringBuilder key = new StringBuilder();
                for (int[] cell : cells) {
                    key.append(cell[0]).append(',').append(cell[1]).append(';');
                }
                shapes.add(key.toString());
            }
        }
        return shapes.size();
    }
}
