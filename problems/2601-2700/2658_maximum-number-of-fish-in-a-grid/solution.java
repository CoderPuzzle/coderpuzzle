import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int findMaxFish(int[][] grid) {
        // Every unvisited water cell seeds one flood fill that totals the
        // fish of its connected component; the best component total wins.
        int rows = grid.length;
        int columns = grid[0].length;
        boolean[][] visited = new boolean[rows][columns];
        int best = 0;
        for (int startRow = 0; startRow < rows; startRow++) {
            for (int startColumn = 0; startColumn < columns; startColumn++) {
                if (grid[startRow][startColumn] == 0 || visited[startRow][startColumn]) {
                    continue;
                }
                visited[startRow][startColumn] = true;
                Deque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[] { startRow, startColumn });
                int total = 0;
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop();
                    total += grid[cell[0]][cell[1]];
                    int[][] steps = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
                    for (int[] step : steps) {
                        int nr = cell[0] + step[0];
                        int nc = cell[1] + step[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] > 0 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stack.push(new int[] { nr, nc });
                        }
                    }
                }
                best = Math.max(best, total);
            }
        }
        return best;
    }
}
