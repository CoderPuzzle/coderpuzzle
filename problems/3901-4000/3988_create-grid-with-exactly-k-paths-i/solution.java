import java.util.Arrays;

class Solution {

    public String[] createGrid(int m, int n, int k) {
        if (m == 1 || n == 1) {
            if (k != 1) {
                return new String[0];
            }
            String[] result = new String[m];
            char[] row = new char[n];
            Arrays.fill(row, '.');
            String open = new String(row);
            for (int i = 0; i < m; i++) {
                result[i] = open;
            }
            return result;
        }

        int[][] blocks;
        if (k == 1) {
            blocks = new int[][] { { 1, 1, 0 } };
        } else if (k == 2) {
            blocks = new int[][] { { 2, 2, 0 } };
        } else if (k == 3) {
            blocks = new int[][] { { 2, 3, 0 }, { 3, 2, 0 } };
        } else {
            blocks = new int[][] { { 2, 4, 0 }, { 4, 2, 0 }, { 3, 3, 1 } };
        }
        for (int[] block : blocks) {
            int height = block[0];
            int width = block[1];
            if (height > m || width > n) {
                continue;
            }
            char[][] grid = new char[m][n];
            for (int i = 0; i < m; i++) {
                Arrays.fill(grid[i], '#');
            }
            for (int i = 0; i < height; i++) {
                for (int j = 0; j < width; j++) {
                    grid[i][j] = '.';
                }
            }
            if (height == 3 && width == 3) {
                grid[0][2] = '#';
                grid[2][0] = '#';
            }
            for (int j = width - 1; j < n; j++) {
                grid[height - 1][j] = '.';
            }
            for (int i = height - 1; i < m; i++) {
                grid[i][n - 1] = '.';
            }
            String[] answer = new String[m];
            for (int i = 0; i < m; i++) {
                answer[i] = new String(grid[i]);
            }
            return answer;
        }
        return new String[0];
    }
}
