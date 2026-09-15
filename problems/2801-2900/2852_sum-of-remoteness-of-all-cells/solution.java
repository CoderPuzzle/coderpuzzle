import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long sumRemoteness(int[][] grid) {
        // One flood fill per unvisited non-blocked cell totals the size and
        // value of its component; a cell reaches exactly its own component,
        // so its remoteness is every other component's value, and summing
        // that over all cells collapses to size * (total - component_sum).
        int rows = grid.length;
        int columns = grid[0].length;
        boolean[][] visited = new boolean[rows][columns];
        long total = 0;
        List<long[]> components = new ArrayList<>();
        for (int startRow = 0; startRow < rows; startRow++) {
            for (int startColumn = 0; startColumn < columns; startColumn++) {
                if (grid[startRow][startColumn] == -1 || visited[startRow][startColumn]) {
                    continue;
                }
                visited[startRow][startColumn] = true;
                Deque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[] { startRow, startColumn });
                long size = 0;
                long values = 0;
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop();
                    size++;
                    values += grid[cell[0]][cell[1]];
                    int[][] steps = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
                    for (int[] step : steps) {
                        int nr = cell[0] + step[0];
                        int nc = cell[1] + step[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] != -1 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stack.push(new int[] { nr, nc });
                        }
                    }
                }
                total += values;
                components.add(new long[] { size, values });
            }
        }
        long answer = 0;
        for (long[] component : components) {
            answer += component[0] * (total - component[1]);
        }
        return answer;
    }
}
