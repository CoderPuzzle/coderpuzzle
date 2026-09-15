import java.util.Arrays;

class Solution {

    public long maximumValueSum(int[][] board) {
        int m = board.length;
        // Per row, only the three most valuable cells can ever matter: a
        // rook of an optimal placement sitting outside its row's top three
        // swaps into one of them — the three candidate columns face at most
        // two blocked ones, so some column is free and the swap never
        // lowers the sum.
        long[][] topVal = new long[m][3];
        int[][] topCol = new int[m][3];
        for (int i = 0; i < m; ++i) {
            int n = board[i].length;
            int[][] cells = new int[n][];
            for (int j = 0; j < n; ++j) cells[j] = new int[] { board[i][j], j };
            Arrays.sort(cells, (a, b) -> Integer.compare(b[0], a[0]));
            for (int c = 0; c < 3; ++c) {
                topVal[i][c] = cells[c][0];
                topCol[i][c] = cells[c][1];
            }
        }

        // Row triples with one candidate each, pairwise-distinct columns.
        // Candidates are value-sorted, so combos run in decreasing
        // partial-sum order and a level is abandoned once even its best
        // completion — the other rows' top cells — cannot beat the answer.
        // Sums reach 3 * 10^9 in absolute value, past the 32-bit range,
        // hence the longs.
        long ans = Long.MIN_VALUE;
        for (int i = 0; i < m; ++i) {
            for (int j = i + 1; j < m; ++j) {
                long jTop = topVal[j][0];
                for (int k = j + 1; k < m; ++k) {
                    long kTop = topVal[k][0];
                    for (int a = 0; a < 3; ++a) {
                        long va = topVal[i][a];
                        if (va + jTop + kTop <= ans) break;
                        int ca = topCol[i][a];
                        for (int b = 0; b < 3; ++b) {
                            if (topCol[j][b] == ca) continue;
                            long vb = topVal[j][b];
                            if (va + vb + kTop <= ans) break;
                            int cb = topCol[j][b];
                            for (int c = 0; c < 3; ++c) {
                                int cc = topCol[k][c];
                                if (cc == ca || cc == cb) continue;
                                long total = va + vb + topVal[k][c];
                                if (total > ans) ans = total;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return ans;
    }
}
