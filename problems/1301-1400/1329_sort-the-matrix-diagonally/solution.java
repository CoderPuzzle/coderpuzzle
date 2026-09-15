import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int[][] diagonalSort(int[][] mat) {
        // Cells on one diagonal share i - j, so sort each diagonal from its
        // top-row / left-column start and write the values back along the walk.
        int m = mat.length;
        int n = mat[0].length;
        int[][] out = new int[m][n];
        for (int si = 0; si < m; ++si) {
            scatter(mat, out, si, 0);
        }
        for (int sj = 1; sj < n; ++sj) {
            scatter(mat, out, 0, sj);
        }
        return out;
    }

    private void scatter(int[][] mat, int[][] out, int si, int sj) {
        int m = mat.length;
        int n = mat[0].length;
        List<Integer> diag = new ArrayList<>();
        for (int i = si, j = sj; i < m && j < n; ++i, ++j) {
            diag.add(mat[i][j]);
        }
        Collections.sort(diag);
        int k = 0;
        for (int i = si, j = sj; i < m && j < n; ++i, ++j) {
            out[i][j] = diag.get(k++);
        }
    }
}
