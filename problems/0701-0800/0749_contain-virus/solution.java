import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int containVirus(int[][] isInfected) {
        // Nothing here is a choice: each day the region whose frontier (the
        // uninfected cells it would reach tonight) is largest gets walled,
        // every other region infects its frontier, and the answer just
        // accumulates the daily wall counts until no frontier is left.
        int rows = isInfected.length;
        int cols = isInfected[0].length;
        int[][] grid = new int[rows][];
        for (int row = 0; row < rows; row++) {
            grid[row] = isInfected[row].clone();
        }
        int walls = 0;
        while (true) {
            int[][] label = new int[rows][cols];
            for (int[] line : label) {
                Arrays.fill(line, -1);
            }
            List<Region> regions = new ArrayList<>();
            for (int row = 0; row < rows; row++) {
                for (int col = 0; col < cols; col++) {
                    if (grid[row][col] == 1 && label[row][col] < 0) {
                        regions.add(measure(grid, label, row, col, regions.size()));
                    }
                }
            }
            if (regions.isEmpty()) {
                return walls;
            }
            Region best = regions.get(0);
            for (Region region : regions) {
                if (region.frontier.size() > best.frontier.size()) {
                    best = region;
                }
            }
            // No region threatens anything: the outbreak is over, walled or
            // fully spread.
            if (best.frontier.isEmpty()) {
                return walls;
            }
            walls += best.walls;
            // 2 marks the quarantined region: inert, never spreading again
            // and never part of a later region.
            for (int[] cell : best.cells) {
                grid[cell[0]][cell[1]] = 2;
            }
            // The night: everyone else infects their frontier at once. A
            // cell the walled region had threatened still falls to an active
            // region — walls seal only the edges they stand on.
            for (Region region : regions) {
                if (region == best) {
                    continue;
                }
                for (int cell : region.frontier) {
                    grid[cell / cols][cell % cols] = 1;
                }
            }
        }
    }

    private Region measure(int[][] grid, int[][] label, int row, int col, int id) {
        // Walk one region with an explicit stack, collecting its cells, its
        // frontier (distinct threatened 0-cells, encoded row*cols+col) and
        // its wall count — one wall per region/0-cell shared edge.
        int rows = grid.length;
        int cols = grid[0].length;
        Region region = new Region();
        label[row][col] = id;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] { row, col });
        int[][] steps = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            region.cells.add(cell);
            for (int[] step : steps) {
                int r = cell[0] + step[0];
                int c = cell[1] + step[1];
                if (r < 0 || r >= rows || c < 0 || c >= cols) {
                    continue;
                }
                if (grid[r][c] == 0) {
                    region.frontier.add(r * cols + c);
                    region.walls++;
                } else if (grid[r][c] == 1 && label[r][c] < 0) {
                    label[r][c] = id;
                    stack.push(new int[] { r, c });
                }
            }
        }
        return region;
    }

    private static final class Region {

        List<int[]> cells = new ArrayList<>();
        Set<Integer> frontier = new HashSet<>();
        int walls;
    }
}
