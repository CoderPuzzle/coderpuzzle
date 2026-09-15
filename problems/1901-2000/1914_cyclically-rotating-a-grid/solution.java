import java.util.*;

class Solution {

    public int[][] rotateGrid(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        int[][] out = new int[m][n];
        // Each layer is peeled into a ring walked counter-clockwise from its
        // top-left corner. Rotating the layer k times moves every element k
        // steps along that walk, which is one right-rotation of the ring by
        // k % ring_len; the ring is then written back along the same walk.
        for (int l = 0; l < Math.min(m, n) / 2; l++) {
            int top = l,
                left = l,
                bottom = m - 1 - l,
                right = n - 1 - l;
            List<int[]> pos = new ArrayList<>();
            for (int r = top; r <= bottom; r++) pos.add(new int[] { r, left });
            for (int c = left + 1; c <= right; c++) pos.add(new int[] { bottom, c });
            for (int r = bottom - 1; r >= top; r--) pos.add(new int[] { r, right });
            for (int c = right - 1; c > left; c--) pos.add(new int[] { top, c });
            int len = pos.size(),
                s = k % len;
            for (int i = 0; i < len; i++) {
                int[] from = pos.get((i - s + len) % len);
                int[] to = pos.get(i);
                out[to[0]][to[1]] = grid[from[0]][from[1]];
            }
        }
        return out;
    }
}
