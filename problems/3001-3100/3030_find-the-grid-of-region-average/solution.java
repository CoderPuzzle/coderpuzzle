class Solution {

    public int[][] resultGrid(int[][] image, int threshold) {
        int m = image.length,
            n = image[0].length;
        if (m < 3 || n < 3) return image;
        // Fold the twelve adjacent-pair tests once: calmH[r][c] says row r is
        // horizontally calm across columns c..c+2, calmV[r][c] says column c
        // is vertically calm across rows r..r+2.
        boolean[][] calmH = new boolean[m][n - 2];
        boolean[][] calmV = new boolean[m - 2][n];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c + 2 < n; ++c) {
                boolean left = Math.abs(image[r][c] - image[r][c + 1]) <= threshold;
                boolean right = Math.abs(image[r][c + 1] - image[r][c + 2]) <= threshold;
                calmH[r][c] = left && right;
            }
        }
        for (int c = 0; c < n; ++c) {
            for (int r = 0; r + 2 < m; ++r) {
                boolean top = Math.abs(image[r][c] - image[r + 1][c]) <= threshold;
                boolean bot = Math.abs(image[r + 1][c] - image[r + 2][c]) <= threshold;
                calmV[r][c] = top && bot;
            }
        }
        // Prefix sums give each window's nine-cell total in constant time.
        int[][] pref = new int[m + 1][n + 1];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + image[r][c];
            }
        }
        int[][] sum = new int[m][n],
            count = new int[m][n];
        for (int i = 0; i + 2 < m; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                if (!calmH[i][j] || !calmH[i + 1][j] || !calmH[i + 2][j]) continue;
                if (!calmV[i][j] || !calmV[i][j + 1] || !calmV[i][j + 2]) continue;
                int avg = (pref[i + 3][j + 3] - pref[i][j + 3] - pref[i + 3][j] + pref[i][j]) / 9;
                for (int r = i; r < i + 3; ++r) {
                    for (int c = j; c < j + 3; ++c) {
                        sum[r][c] += avg;
                        ++count[r][c];
                    }
                }
            }
        }
        int[][] result = new int[m][n];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                result[r][c] = count[r][c] > 0 ? sum[r][c] / count[r][c] : image[r][c];
            }
        }
        return result;
    }
}
