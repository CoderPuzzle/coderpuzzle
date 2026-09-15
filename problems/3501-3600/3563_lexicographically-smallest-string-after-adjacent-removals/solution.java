class Solution {

    public String lexicographicallySmallestString(String s) {
        int n = s.length();
        if (n <= 1) return s;

        // rem[i][j] = can s[i..j] be removed entirely
        boolean[][] rem = new boolean[n][n];
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length <= n; i++) {
                int j = i + length - 1;
                for (int k = i; k < j; k++) {
                    if (rem[i][k] && rem[k + 1][j]) {
                        rem[i][j] = true;
                        break;
                    }
                }
                if (!rem[i][j] && consec(s.charAt(i), s.charAt(j))) {
                    if (length == 2 || rem[i + 1][j - 1]) {
                        rem[i][j] = true;
                    }
                }
            }
        }

        String[] ans = new String[n + 1];
        ans[n] = "";
        for (int i = n - 1; i >= 0; i--) {
            String best = null;
            for (int j = i; j <= n; j++) {
                if (j > i && !rem[i][j - 1]) continue;
                String cand = j < n ? s.charAt(j) + ans[j + 1] : "";
                if (best == null || cand.compareTo(best) < 0) best = cand;
            }
            ans[i] = best;
        }
        return ans[0];
    }

    private static boolean consec(char a, char b) {
        int d = Math.abs(a - b);
        return d == 1 || d == 25; // 'a'-'z' are consecutive (circular)
    }
}
