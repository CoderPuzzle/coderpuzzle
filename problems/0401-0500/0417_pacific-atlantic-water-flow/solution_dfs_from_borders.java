import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] pacificAtlantic(int[][] heights) {
        int m = heights.length;
        int n = heights[0].length;

        // Reverse the flow: walk inland from each ocean's border instead of
        // downhill from every cell, so one traversal marks all draining cells.
        boolean[][] pacific = reachable(heights, border(m, n, true));
        boolean[][] atlantic = reachable(heights, border(m, n, false));

        // Row-major intersection of the two reachable sets comes out sorted.
        List<int[]> cells = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    cells.add(new int[] { r, c });
                }
            }
        }
        int[][] result = new int[cells.size()][2];
        for (int i = 0; i < cells.size(); i++) {
            result[i] = cells.get(i);
        }
        return result;
    }

    private int[] border(int m, int n, boolean pacific) {
        // Pacific seeds are the top row and left column; Atlantic the bottom
        // row and right column. Corner cells land in both seed lists.
        List<Integer> cells = new ArrayList<>();
        if (pacific) {
            for (int c = 0; c < n; c++) {
                cells.add(0 * n + c);
            }
            for (int r = 0; r < m; r++) {
                cells.add(r * n + 0);
            }
        } else {
            for (int c = 0; c < n; c++) {
                cells.add((m - 1) * n + c);
            }
            for (int r = 0; r < m; r++) {
                cells.add(r * n + (n - 1));
            }
        }
        int[] packed = new int[cells.size()];
        for (int i = 0; i < cells.size(); i++) {
            packed[i] = cells.get(i);
        }
        return packed;
    }

    private boolean[][] reachable(int[][] heights, int[] border) {
        int m = heights.length;
        int n = heights[0].length;
        boolean[][] seen = new boolean[m][n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int cell : border) {
            if (!seen[cell / n][cell % n]) {
                seen[cell / n][cell % n] = true;
            }
            stack.push(cell);
        }
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        while (!stack.isEmpty()) {
            int cell = stack.pop();
            int r = cell / n;
            int c = cell % n;
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                // Only a neighbor at least as tall could have flowed down
                // into (r, c).
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !seen[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                    // Mark on push so each cell enters the stack at most once.
                    seen[nr][nc] = true;
                    stack.push(nr * n + nc);
                }
            }
        }
        return seen;
    }
}
