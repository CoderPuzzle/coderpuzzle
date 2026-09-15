class Solution {

    public int maxTrailingZeros(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        int[][] count2 = new int[m][n];
        int[][] count5 = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int x = grid[i][j];
                int c2 = 0;
                while (x % 2 == 0) {
                    x /= 2;
                    c2++;
                }
                int c5 = 0;
                while (x % 5 == 0) {
                    x /= 5;
                    c5++;
                }
                count2[i][j] = c2;
                count5[i][j] = c5;
            }
        }

        // row2[i][j+1] = sum count2[i][0..j]; row5 analogous.
        int[][] row2 = new int[m][n + 1];
        int[][] row5 = new int[m][n + 1];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                row2[i][j + 1] = row2[i][j] + count2[i][j];
                row5[i][j + 1] = row5[i][j] + count5[i][j];
            }
        }

        // col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
        int[][] col2 = new int[n][m + 1];
        int[][] col5 = new int[n][m + 1];
        for (int j = 0; j < n; j++) {
            for (int i = 0; i < m; i++) {
                col2[j][i + 1] = col2[j][i] + count2[i][j];
                col5[j][i + 1] = col5[j][i] + count5[i][j];
            }
        }

        int answer = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int cell2 = count2[i][j];
                int cell5 = count5[i][j];
                // horizontal sum over full row segment, vertical over full column segment
                int horiz2Left = row2[i][j + 1]; // cols [0, j]
                int horiz2Right = row2[i][n] - row2[i][j]; // cols [j, n-1]
                int vert2Top = col2[j][i + 1]; // rows [0, i]
                int vert2Bottom = col2[j][m] - col2[j][i]; // rows [i, m-1]
                int horiz5Left = row5[i][j + 1];
                int horiz5Right = row5[i][n] - row5[i][j];
                int vert5Top = col5[j][i + 1];
                int vert5Bottom = col5[j][m] - col5[j][i];

                answer = Math.max(
                    answer,
                    Math.max(
                        Math.min(horiz2Left + vert2Top - cell2, horiz5Left + vert5Top - cell5),
                        Math.max(
                            Math.min(horiz2Right + vert2Top - cell2, horiz5Right + vert5Top - cell5),
                            Math.max(
                                Math.min(horiz2Left + vert2Bottom - cell2, horiz5Left + vert5Bottom - cell5),
                                Math.min(horiz2Right + vert2Bottom - cell2, horiz5Right + vert5Bottom - cell5)
                            )
                        )
                    )
                );
            }
        }
        return answer;
    }
}
