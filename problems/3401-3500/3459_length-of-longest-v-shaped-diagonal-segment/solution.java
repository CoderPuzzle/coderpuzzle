class Solution {

    public int lenOfVDiagonal(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        // Diagonal directions in clockwise order NW, NE, SE, SW: a clockwise
        // 90-degree turn maps index d to (d + 1) % 4. Past the head '1' the
        // values alternate 2, 0, 2, 0, ..., so the other expected value of
        // e in {0, 2} is 2 - e; table index j encodes e = 2 * j.
        int[] dr = { -1, -1, 1, 1 };
        int[] dc = { -1, 1, 1, -1 };
        // Straight tables: S[j][d] holds the longest run starting at each
        // cell going straight in direction d when the cell must equal 2*j.
        int[][][][] S = new int[2][4][n][m];
        int[][][][] M = new int[2][4][n][m];
        for (int d = 0; d < 4; d++) {
            // Sweep rows against the direction so the next row is computed.
            for (int i = 0; i < n; i++) {
                int r = dr[d] < 0 ? i : n - 1 - i;
                for (int c = 0; c < m; c++) {
                    for (int j = 0; j < 2; j++) {
                        if (grid[r][c] != 2 * j) continue;
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        int nxt = 0 <= nr && nr < n && 0 <= nc && nc < m ? S[1 - j][d][nr][nc] : 0;
                        S[j][d][r][c] = 1 + nxt;
                    }
                }
            }
        }
        // One-turn tables: continue straight in direction d, or make the
        // single clockwise turn and hand over to the straight tables of
        // direction (d + 1) % 4.
        for (int d = 0; d < 4; d++) {
            int cw = (d + 1) % 4;
            for (int i = 0; i < n; i++) {
                int r = dr[d] < 0 ? i : n - 1 - i;
                for (int c = 0; c < m; c++) {
                    for (int j = 0; j < 2; j++) {
                        if (grid[r][c] != 2 * j) continue;
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        int tr = r + dr[cw];
                        int tc = c + dc[cw];
                        int best = 0 <= nr && nr < n && 0 <= nc && nc < m ? M[1 - j][d][nr][nc] : 0;
                        if (0 <= tr && tr < n && 0 <= tc && tc < m) {
                            best = Math.max(best, S[1 - j][cw][tr][tc]);
                        }
                        M[j][d][r][c] = 1 + best;
                    }
                }
            }
        }
        // A head '1' plus the best one-turn run over its four first steps.
        int ans = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (grid[r][c] != 1) continue;
                int best = 0;
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];
                    if (0 <= nr && nr < n && 0 <= nc && nc < m) {
                        best = Math.max(best, M[1][d][nr][nc]);
                    }
                }
                ans = Math.max(ans, 1 + best);
            }
        }
        return ans;
    }
}
