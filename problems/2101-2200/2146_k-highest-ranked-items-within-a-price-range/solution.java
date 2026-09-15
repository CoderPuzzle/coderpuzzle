import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public List<List<Integer>> highestRankedKItems(int[][] grid, int[] pricing, int[] start, int k) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] distance = new int[rows][columns];
        for (int[] row : distance) Arrays.fill(row, -1);
        distance[start[0]][start[1]] = 0;
        ArrayDeque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { start[0], start[1] });
        List<int[]> candidates = new ArrayList<>();
        int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            int row = cell[0];
            int column = cell[1];
            int price = grid[row][column];
            if (pricing[0] <= price && price <= pricing[1]) {
                candidates.add(new int[] { distance[row][column], price, row, column });
            }
            for (int[] direction : directions) {
                int nr = row + direction[0];
                int nc = column + direction[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] > 0 && distance[nr][nc] == -1) {
                    distance[nr][nc] = distance[row][column] + 1;
                    queue.add(new int[] { nr, nc });
                }
            }
        }
        candidates.sort((left, right) -> {
            for (int index = 0; index < 4; index++) {
                if (left[index] != right[index]) return Integer.compare(left[index], right[index]);
            }
            return 0;
        });
        List<List<Integer>> answer = new ArrayList<>();
        for (int index = 0; index < Math.min(k, candidates.size()); index++) {
            int[] candidate = candidates.get(index);
            answer.add(Arrays.asList(candidate[2], candidate[3]));
        }
        return answer;
    }
}
