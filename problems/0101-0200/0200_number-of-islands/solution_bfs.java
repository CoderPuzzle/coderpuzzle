import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int numIslands(String[][] grid) {
        int rows = grid.length;
        if (rows == 0) return 0;
        int cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        int count = 0;
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c].equals("1") && !visited[r][c]) {
                    count++;
                    Deque<int[]> queue = new ArrayDeque<>();
                    queue.offer(new int[] { r, c });
                    visited[r][c] = true;
                    while (!queue.isEmpty()) {
                        int[] cell = queue.poll();
                        for (int[] d : dirs) {
                            int nx = cell[0] + d[0],
                                ny = cell[1] + d[1];
                            if (
                                nx >= 0 &&
                                nx < rows &&
                                ny >= 0 &&
                                ny < cols &&
                                grid[nx][ny].equals("1") &&
                                !visited[nx][ny]
                            ) {
                                visited[nx][ny] = true;
                                queue.offer(new int[] { nx, ny });
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
}
