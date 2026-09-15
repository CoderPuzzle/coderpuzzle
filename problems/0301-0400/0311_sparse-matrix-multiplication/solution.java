import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int m = mat1.length,
            k = mat2.length,
            n = mat2[0].length;
        // For each row of mat2, the (column, value) pairs that are nonzero —
        // the only entries a nonzero mat1 cell can ever pair with.
        List<int[]>[] nonzero2 = new ArrayList[k];
        for (int p = 0; p < k; ++p) {
            nonzero2[p] = new ArrayList<>();
            for (int j = 0; j < n; ++j) {
                if (mat2[p][j] != 0) nonzero2[p].add(new int[] { j, mat2[p][j] });
            }
        }
        int[][] result = new int[m][n];
        // A zero in mat1 wipes a whole row of products; skip it instead of
        // multiplying every mat2 entry by zero.
        for (int i = 0; i < m; ++i) {
            for (int p = 0; p < k; ++p) {
                int value = mat1[i][p];
                if (value == 0) continue;
                for (int[] pair : nonzero2[p]) result[i][pair[0]] += value * pair[1];
            }
        }
        return result;
    }
}
