import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] colorRed(int n) {
        // Period-4 construction, four rows at a time going bottom up. The
        // leftover tip rows (tipSize = n % 4) are seeded at the top, then
        // everything below tiles into full bands of four rows: each band's
        // top row takes the leftmost triangle, its second row takes every
        // odd column except the first, its third row a single column-2
        // triangle, and its bottom row every odd column. Under the >= 2
        // red-neighbors rule each band floods by itself, so the whole
        // triangle ends red using the minimum number of initial seeds.
        List<int[]> rows = new ArrayList<>();
        int tipSize = n % 4;
        if (tipSize >= 1) {
            rows.add(new int[] { 1, 1 });
        }
        for (int r = 2; r <= tipSize; r++) {
            rows.add(new int[] { r, 1 });
            rows.add(new int[] { r, 2 * r - 1 });
        }
        for (int i = tipSize + 1; i < n; i += 4) {
            // Top row of this band.
            rows.add(new int[] { i, 1 });
            // Second row: odd columns 3 .. 2i+1.
            for (int j = 1; j <= i; j++) {
                rows.add(new int[] { i + 1, 2 * j + 1 });
            }
            // Third row: single down-pointing triangle.
            rows.add(new int[] { i + 2, 2 });
            // Bottom row: every odd column.
            for (int j = 0; j <= i + 2; j++) {
                rows.add(new int[] { i + 3, 2 * j + 1 });
            }
        }
        return rows.toArray(new int[0][]);
    }
}
