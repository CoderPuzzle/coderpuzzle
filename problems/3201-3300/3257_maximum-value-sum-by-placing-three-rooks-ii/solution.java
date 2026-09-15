class Solution {

    public long maximumValueSum(int[][] board) {
        // The three rooks occupy three distinct rows; pick the middle row i.
        // top[i][j] is the best cell in column j above row i and bottom[i][j]
        // the best below. A placement takes one column from the top band, one
        // from row i, one from the bottom band, all distinct — and only each
        // band's three best columns can matter, so 27 combinations per middle
        // row are exact. Sums reach 3 * 10^9, so accumulate in long.
        int m = board.length;
        int n = board[0].length;
        long[][] top = new long[m][n];
        long[][] bottom = new long[m][n];
        for (int j = 0; j < n; j++) {
            top[0][j] = board[0][j];
            for (int i = 1; i < m; i++) {
                top[i][j] = Math.max(top[i - 1][j], board[i][j]);
            }
            bottom[m - 1][j] = board[m - 1][j];
            for (int i = m - 2; i >= 0; i--) {
                bottom[i][j] = Math.max(bottom[i + 1][j], board[i][j]);
            }
        }
        long ans = Long.MIN_VALUE;
        for (int i = 1; i < m - 1; i++) {
            int[] t = top3(top[i - 1]);
            int[] mid = top3Int(board[i]);
            int[] b = top3(bottom[i + 1]);
            for (int ca : t) {
                for (int cb : mid) {
                    if (cb == ca) {
                        continue;
                    }
                    for (int cc : b) {
                        if (cc == ca || cc == cb) {
                            continue;
                        }
                        ans = Math.max(ans, top[i - 1][ca] + board[i][cb] + bottom[i + 1][cc]);
                    }
                }
            }
        }
        return ans;
    }

    private static int[] top3(long[] vals) {
        Integer[] idx = new Integer[vals.length];
        for (int c = 0; c < vals.length; c++) {
            idx[c] = c;
        }
        java.util.Arrays.sort(idx, (a, b) -> Long.compare(vals[b], vals[a]));
        return new int[] { idx[0], idx[1], idx[2] };
    }

    private static int[] top3Int(int[] vals) {
        Integer[] idx = new Integer[vals.length];
        for (int c = 0; c < vals.length; c++) {
            idx[c] = c;
        }
        java.util.Arrays.sort(idx, (a, b) -> Integer.compare(vals[b], vals[a]));
        return new int[] { idx[0], idx[1], idx[2] };
    }
}
