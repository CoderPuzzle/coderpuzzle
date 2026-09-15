class Solution {

    public int interleaveCharacters(String a, String b, String t) {
        int M = 1000000007,
            n = a.length(),
            m = b.length();
        int[][] d = new int[n + 1][m + 1];
        d[0][0] = 1;
        for (char ch : t.toCharArray()) {
            int[][] e = new int[n + 1][m + 1];
            for (int j = 0; j <= m; j++) {
                long run = 0;
                for (int i = 0; i <= n; i++) {
                    run = (run + d[i][j]) % M;
                    if (i < n && a.charAt(i) == ch) e[i + 1][j] = (int) ((e[i + 1][j] + run) % M);
                }
            }
            for (int i = 0; i <= n; i++) {
                long run = 0;
                for (int j = 0; j <= m; j++) {
                    run = (run + d[i][j]) % M;
                    if (j < m && b.charAt(j) == ch) e[i][j + 1] = (int) ((e[i][j + 1] + run) % M);
                }
            }
            d = e;
        }
        long z = 0;
        for (int[] r : d) for (int x : r) z += x;
        return (int) ((z - sub(a, t) - sub(b, t) + 2L * M) % M);
    }

    int sub(String w, String t) {
        int M = 1000000007;
        int[] d = new int[t.length() + 1];
        d[0] = 1;
        for (char c : w.toCharArray())
            for (int j = t.length() - 1; j >= 0; j--) if (t.charAt(j) == c) d[j + 1] = (d[j + 1] + d[j]) % M;
        return d[t.length()];
    }
}
