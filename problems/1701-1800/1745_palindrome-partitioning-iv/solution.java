class Solution {

    public boolean checkPartitioning(String s) {
        int n = s.length();
        // isPal[l][r] marks s[l..r] as a palindrome; entries are filled
        // by increasing length so each one depends on a shorter interval.
        boolean[][] isPal = new boolean[n][n];
        for (int i = 0; i < n; ++i) isPal[i][i] = true;
        for (int i = 0; i + 1 < n; ++i) {
            if (s.charAt(i) == s.charAt(i + 1)) isPal[i][i + 1] = true;
        }
        for (int length = 3; length <= n; ++length) {
            for (int l = 0; l + length <= n; ++l) {
                int r = l + length - 1;
                if (s.charAt(l) == s.charAt(r) && isPal[l + 1][r - 1]) isPal[l][r] = true;
            }
        }
        // Three non-empty parts are fixed by two cuts i and j; every cut
        // pair is tried against the table.
        for (int i = 1; i < n - 1; ++i) {
            if (!isPal[0][i - 1]) continue;
            for (int j = i + 1; j < n; ++j) {
                if (isPal[i][j - 1] && isPal[j][n - 1]) return true;
            }
        }
        return false;
    }
}
