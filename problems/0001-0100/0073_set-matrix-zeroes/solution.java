class Solution {

    public int[][] setZeroes(int[][] matrix) {
        // The first row and column double as the marker zone, so their own
        // fate must be saved in two flags before any marker is written.
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowZero = false;
        for (int value : matrix[0]) firstRowZero |= value == 0;
        boolean firstColZero = false;
        for (int[] row : matrix) firstColZero |= row[0] == 0;
        // First pass: each interior zero stamps its row and column into the
        // marker zone (the leading cell of its row and of its column).
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        // Second pass: replay the markers as wipes of interior cells only.
        // Neither sweep writes into the marker zone, so the markers stay
        // readable until both have consumed them.
        for (int i = 1; i < m; ++i) {
            if (matrix[i][0] == 0) {
                for (int j = 1; j < n; ++j) matrix[i][j] = 0;
            }
        }
        for (int j = 1; j < n; ++j) {
            if (matrix[0][j] == 0) {
                for (int i = 1; i < m; ++i) matrix[i][j] = 0;
            }
        }
        // The saved flags apply last, zeroing the marker zone itself — a
        // marker must never be mistaken for an original zero of row 0/col 0.
        if (firstRowZero) {
            for (int j = 0; j < n; ++j) matrix[0][j] = 0;
        }
        if (firstColZero) {
            for (int i = 0; i < m; ++i) matrix[i][0] = 0;
        }
        // The rewrite happened inside the input allocation; the same matrix,
        // now zeroed, is what the judge compares.
        return matrix;
    }
}
