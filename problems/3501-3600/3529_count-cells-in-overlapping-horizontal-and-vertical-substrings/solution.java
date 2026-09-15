class Solution {

    public int countCells(String[][] grid, String pattern) {
        int m = grid.length,
            n = grid[0].length;
        int total = m * n,
            length = pattern.length();

        // KMP failure function over the pattern.
        int[] fail = new int[length];
        for (int i = 1, k = 0; i < length; i++) {
            while (k > 0 && pattern.charAt(i) != pattern.charAt(k)) k = fail[k - 1];
            if (pattern.charAt(i) == pattern.charAt(k)) k++;
            fail[i] = k;
        }

        // Horizontal reads = row-major flatten; vertical reads = column-major.
        char[] horizontal = new char[total];
        int pos = 0;
        for (String[] row : grid) for (String cell : row) horizontal[pos++] = cell.charAt(0);
        char[] vertical = new char[total];
        pos = 0;
        for (int c = 0; c < n; c++) for (int r = 0; r < m; r++) vertical[pos++] = grid[r][c].charAt(0);

        // Difference arrays over the two flatten orders; a match covers
        // positions start .. start + length - 1 in its own flatten order.
        int[] hmark = new int[total + 1],
            vmark = new int[total + 1];
        markStarts(horizontal, pattern, fail, length, hmark);
        markStarts(vertical, pattern, fail, length, vmark);
        for (int i = 0; i < total; i++) {
            hmark[i + 1] += hmark[i];
            vmark[i + 1] += vmark[i];
        }

        // A cell (r, c) sits at row-major position r*n+c and column-major
        // position c*m+r; it counts iff both marks cover it.
        int covered = 0;
        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (
            hmark[r * n + c] > 0 && vmark[c * m + r] > 0
        ) covered++;
        return covered;
    }

    private void markStarts(char[] text, String pattern, int[] fail, int length, int[] mark) {
        for (int i = 0, k = 0; i < text.length; i++) {
            while (k > 0 && text[i] != pattern.charAt(k)) k = fail[k - 1];
            if (text[i] == pattern.charAt(k)) k++;
            if (k == length) {
                mark[i - length + 1]++;
                mark[i + 1]--;
                k = fail[k - 1];
            }
        }
    }
}
