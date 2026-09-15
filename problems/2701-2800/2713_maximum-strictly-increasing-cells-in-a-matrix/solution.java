import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int maxIncreasingCells(int[][] mat) {
        // Chains only ever move to strictly greater values, so sweeping the
        // distinct values in ascending order lets every cell inherit the
        // best chain that already ends in its row or column among smaller
        // values. Cells sharing one value form a read-then-write batch:
        // their answers come from the row/column state before the batch,
        // and the maxima absorb the whole batch afterwards, since an
        // equal-value cell can never continue a chain.
        int rows = mat.length;
        int cols = mat[0].length;
        int[][] cells = new int[rows * cols][];
        int idx = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                cells[idx++] = new int[] { mat[r][c], r, c };
            }
        }
        Arrays.sort(cells, (p, q) -> Integer.compare(p[0], q[0]));
        int[] rowMax = new int[rows];
        int[] colMax = new int[cols];
        int best = 0;
        int i = 0;
        while (i < cells.length) {
            int j = i; // run-length batch equal values: equal cells never chain
            while (j < cells.length && cells[j][0] == cells[i][0]) {
                ++j;
            }
            List<int[]> batch = new ArrayList<>();
            for (int k = i; k < j; ++k) {
                int r = cells[k][1];
                int c = cells[k][2];
                // one more than the best chain ending at a smaller value
                int length = Math.max(rowMax[r], colMax[c]) + 1;
                batch.add(new int[] { length, r, c });
                best = Math.max(best, length);
            }
            for (int[] entry : batch) {
                int length = entry[0],
                    r = entry[1],
                    c = entry[2];
                if (rowMax[r] < length) {
                    rowMax[r] = length;
                }
                if (colMax[c] < length) {
                    colMax[c] = length;
                }
            }
            i = j;
        }
        return best;
    }
}
