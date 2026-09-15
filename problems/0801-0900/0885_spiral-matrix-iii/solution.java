import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] spiralMatrixIII(int rows, int cols, int rStart, int cStart) {
        // The walk is a turtle: it runs east, south, west, north, east, ...
        // in turn, and every second turn the straight runs grow by one step
        // (1, 1, 2, 2, 3, 3, ...). A step that lands outside the grid is
        // still taken — the spiral reaches the far cells only by leaving
        // and re-entering — but only in-grid positions are recorded, and
        // once rows * cols of them are, the whole grid is visited and the
        // walk stops.
        int total = rows * cols;
        List<int[]> order = new ArrayList<>();
        order.add(new int[] { rStart, cStart });
        int[][] directions = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };
        int r = rStart;
        int c = cStart;
        int d = 0;
        int step = 1;
        while (order.size() < total) {
            for (int side = 0; side < 2; ++side) {
                int[] delta = directions[d];
                for (int i = 0; i < step; ++i) {
                    r += delta[0];
                    c += delta[1];
                    if (0 <= r && r < rows && 0 <= c && c < cols) {
                        order.add(new int[] { r, c });
                    }
                }
                d = (d + 1) % 4;
            }
            ++step;
        }
        return order.toArray(new int[0][]);
    }
}
