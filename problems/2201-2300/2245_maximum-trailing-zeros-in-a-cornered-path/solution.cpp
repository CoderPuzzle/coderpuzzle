class Solution {
  public:
    int maxTrailingZeros(vector<vector<int>> &grid) {
        int m = grid.size();
        int n = grid[0].size();

        vector<vector<int>> count2(m, vector<int>(n, 0));
        vector<vector<int>> count5(m, vector<int>(n, 0));
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
        vector<vector<int>> row2(m, vector<int>(n + 1, 0));
        vector<vector<int>> row5(m, vector<int>(n + 1, 0));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                row2[i][j + 1] = row2[i][j] + count2[i][j];
                row5[i][j + 1] = row5[i][j] + count5[i][j];
            }
        }

        // col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
        vector<vector<int>> col2(n, vector<int>(m + 1, 0));
        vector<vector<int>> col5(n, vector<int>(m + 1, 0));
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
                int horiz2_left = row2[i][j + 1];           // cols [0, j]
                int horiz2_right = row2[i][n] - row2[i][j]; // cols [j, n-1]
                int vert2_top = col2[j][i + 1];             // rows [0, i]
                int vert2_bottom = col2[j][m] - col2[j][i]; // rows [i, m-1]
                int horiz5_left = row5[i][j + 1];
                int horiz5_right = row5[i][n] - row5[i][j];
                int vert5_top = col5[j][i + 1];
                int vert5_bottom = col5[j][m] - col5[j][i];

                answer = max(answer, max({
                                         min(horiz2_left + vert2_top - cell2, horiz5_left + vert5_top - cell5),
                                         min(horiz2_right + vert2_top - cell2, horiz5_right + vert5_top - cell5),
                                         min(horiz2_left + vert2_bottom - cell2, horiz5_left + vert5_bottom - cell5),
                                         min(horiz2_right + vert2_bottom - cell2, horiz5_right + vert5_bottom - cell5),
                                     }));
            }
        }
        return answer;
    }
};
