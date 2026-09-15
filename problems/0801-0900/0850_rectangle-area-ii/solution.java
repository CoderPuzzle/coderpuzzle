import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

class Solution {

    public int rectangleArea(int[][] rectangles) {
        final long MOD = 1000000007L;
        if (rectangles.length == 0) return 0;
        // Coordinate compression: with at most 2R distinct values per
        // axis, cell boundaries are exactly the rectangle edges, so
        // coverage is constant within each cell.
        TreeSet<Long> xsSet = new TreeSet<>();
        TreeSet<Long> ysSet = new TreeSet<>();
        for (int[] rect : rectangles) {
            xsSet.add((long) rect[0]);
            xsSet.add((long) rect[2]);
            ysSet.add((long) rect[1]);
            ysSet.add((long) rect[3]);
        }
        List<Long> xs = new ArrayList<>(xsSet);
        List<Long> ys = new ArrayList<>(ysSet);
        Map<Long, Integer> xIndex = new HashMap<>();
        for (int i = 0; i < xs.size(); i++) xIndex.put(xs.get(i), i);
        Map<Long, Integer> yIndex = new HashMap<>();
        for (int i = 0; i < ys.size(); i++) yIndex.put(ys.get(i), i);
        int nx = xs.size() - 1;
        int ny = ys.size() - 1;
        boolean[][] grid = new boolean[nx][ny];
        // Mark the half-open compressed range: adjacent rectangles
        // share edge cells without overlap or gaps, and idempotent
        // marking counts overlaps once.
        for (int[] rect : rectangles) {
            for (int i = xIndex.get((long) rect[0]); i < xIndex.get((long) rect[2]); i++) {
                for (int j = yIndex.get((long) rect[1]); j < yIndex.get((long) rect[3]); j++) {
                    grid[i][j] = true;
                }
            }
        }
        // Sum the real areas of marked cells, reducing at each step.
        long total = 0;
        for (int i = 0; i < nx; i++) {
            for (int j = 0; j < ny; j++) {
                if (grid[i][j]) {
                    long dx = xs.get(i + 1) - xs.get(i);
                    long dy = ys.get(j + 1) - ys.get(j);
                    total = (total + (dx % MOD) * (dy % MOD)) % MOD;
                }
            }
        }
        return (int) total;
    }
}
