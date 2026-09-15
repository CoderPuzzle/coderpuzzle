import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean containsCycle(String[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int r0 = 0; r0 < rows; r0++) {
            for (int c0 = 0; c0 < cols; c0++) {
                if (visited[r0][c0]) continue;
                visited[r0][c0] = true;
                Deque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[] { r0, c0, -1, -1 });
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop();
                    int x = cell[0],
                        y = cell[1],
                        px = cell[2],
                        py = cell[3];
                    for (int[] d : dirs) {
                        int nx = x + d[0],
                            ny = y + d[1];
                        if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;
                        if (!grid[nx][ny].equals(grid[x][y])) continue;
                        if (nx == px && ny == py) continue;
                        if (visited[nx][ny]) return true;
                        visited[nx][ny] = true;
                        stack.push(new int[] { nx, ny, x, y });
                    }
                }
            }
        }
        return false;
    }
}
