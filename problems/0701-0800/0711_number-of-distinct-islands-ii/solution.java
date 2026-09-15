import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int numDistinctIslands2(int[][] grid) {
        // Flood-fill each island with an explicit stack, then name the shape
        // by the smallest normalized cell serialization among its eight
        // rotations and reflections, so islands equal under the statement's
        // rule — and only those — produce one identical signature.
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
                ArrayDeque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[] { i, j });
                List<int[]> cells = new ArrayList<>();
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop();
                    int r = cell[0],
                        c = cell[1];
                    cells.add(cell);
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
                            stack.push(nb);
                        }
                    }
                }
                String best = null;
                for (int t = 0; t < 8; ++t) {
                    int a = (t & 1) == 0 ? 1 : -1;
                    int b = (t & 2) == 0 ? 1 : -1;
                    boolean swap = (t & 4) != 0;
                    List<int[]> moved = new ArrayList<>();
                    int r0 = Integer.MAX_VALUE,
                        c0 = Integer.MAX_VALUE;
                    for (int[] cell : cells) {
                        int nr = a * (swap ? cell[1] : cell[0]);
                        int nc = b * (swap ? cell[0] : cell[1]);
                        moved.add(new int[] { nr, nc });
                        r0 = Math.min(r0, nr);
                        c0 = Math.min(c0, nc);
                    }
                    for (int[] cell : moved) {
                        cell[0] -= r0;
                        cell[1] -= c0;
                    }
                    moved.sort((x, y) -> x[0] != y[0] ? x[0] - y[0] : x[1] - y[1]);
                    StringBuilder key = new StringBuilder();
                    for (int[] cell : moved) {
                        key.append(cell[0]).append(',').append(cell[1]).append(';');
                    }
                    String candidate = key.toString();
                    if (best == null || candidate.compareTo(best) < 0) {
                        best = candidate;
                    }
                }
                shapes.add(best);
            }
        }
        return shapes.size();
    }
}
