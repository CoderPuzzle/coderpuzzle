import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    // Cells with i - j >= 0 form the bottom-left triangle together with
    // the middle diagonal (descending); i - j < 0 is the top-right
    // triangle (ascending). Visiting row-major keeps every diagonal's
    // values in top-left-to-bottom-right order, so one cursor per diagonal
    // pours them back in place.
    public int[][] sortMatrix(int[][] grid) {
        int n = grid.length;
        List<Integer>[] diags = new ArrayList[2 * n - 1];
        for (int k = 0; k < 2 * n - 1; k++) {
            diags[k] = new ArrayList<>();
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                diags[i - j + n - 1].add(grid[i][j]);
            }
        }
        for (int k = 0; k < 2 * n - 1; k++) {
            if (k >= n - 1) {
                Collections.sort(diags[k], Collections.reverseOrder());
            } else {
                Collections.sort(diags[k]);
            }
        }
        int[] pos = new int[2 * n - 1];
        int[][] out = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int k = i - j + n - 1;
                out[i][j] = diags[k].get(pos[k]);
                pos[k]++;
            }
        }
        return out;
    }
}
