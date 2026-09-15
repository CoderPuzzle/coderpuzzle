import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int numEnclaves(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        // Iterative BFS (explicit queue, not recursion) starting from every
        // land cell already sitting on the boundary: that land can trivially
        // walk off the grid, and so can every land cell it can reach.
        Deque<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                boolean onBoundary = r == 0 || r == rows - 1 || c == 0 || c == cols - 1;
                if (onBoundary && grid[r][c] == 1) {
                    queue.add(new int[] { r, c });
                    grid[r][c] = 0;
                }
            }
        }

        int[][] directions = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            for (int[] direction : directions) {
                int nr = cell[0] + direction[0];
                int nc = cell[1] + direction[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    queue.add(new int[] { nr, nc });
                }
            }
        }

        // Whatever land the fill never reached could never walk off the
        // grid: that's exactly the enclosed count.
        int count = 0;
        for (int[] row : grid) {
            for (int cell : row) {
                count += cell;
            }
        }
        return count;
    }
}
