import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

class Solution {

    public int cutOffTree(int[][] forest) {
        // The order is not a choice: the trees must fall shortest to tallest.
        // What is left to plan is only the walk between consecutive trees,
        // and each of those legs is an unweighted shortest path — a plain
        // BFS. Cutting a tree rewrites its cell to 1, which is still
        // walkable, so every leg can search the original forest unchanged.
        List<int[]> trees = new ArrayList<>();
        for (int row = 0; row < forest.length; row++) {
            for (int col = 0; col < forest[0].length; col++) {
                if (forest[row][col] > 1) {
                    trees.add(new int[] { forest[row][col], row, col });
                }
            }
        }
        Collections.sort(trees, (a, b) -> Integer.compare(a[0], b[0]));
        int total = 0;
        int row = 0;
        int col = 0;
        for (int[] tree : trees) {
            int steps = walk(forest, row, col, tree[1], tree[2]);
            if (steps < 0) {
                return -1;
            }
            total += steps;
            row = tree[1];
            col = tree[2];
        }
        return total;
    }

    private int walk(int[][] forest, int startRow, int startCol, int targetRow, int targetCol) {
        // A wall under the walker means the leg never begins; only the
        // initial (0, 0) can actually be a 0 cell.
        if (forest[startRow][startCol] == 0) {
            return -1;
        }
        if (startRow == targetRow && startCol == targetCol) {
            return 0;
        }
        int rows = forest.length;
        int cols = forest[0].length;
        Deque<int[]> pending = new ArrayDeque<>();
        int[][] distance = new int[rows][cols];
        for (int[] line : distance) {
            Arrays.fill(line, -1);
        }
        distance[startRow][startCol] = 0;
        pending.add(new int[] { startRow, startCol });
        int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!pending.isEmpty()) {
            int[] cell = pending.poll();
            int near = distance[cell[0]][cell[1]] + 1;
            for (int[] direction : directions) {
                int row = cell[0] + direction[0];
                int col = cell[1] + direction[1];
                // Trees and empty cells are both walkable; only 0 is not.
                if (
                    row < 0 || row >= rows || col < 0 || col >= cols || forest[row][col] == 0 || distance[row][col] >= 0
                ) {
                    continue;
                }
                if (row == targetRow && col == targetCol) {
                    return near;
                }
                distance[row][col] = near;
                pending.add(new int[] { row, col });
            }
        }
        return -1;
    }
}
