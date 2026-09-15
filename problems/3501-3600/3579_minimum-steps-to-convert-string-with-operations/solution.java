class Solution {

    public int minOperations(String word1, String word2) {
        // Per part, an index may serve at most one swap, one replace and
        // one reversal, so an optimal schedule permutes first (at most one
        // reversal plus disjoint swaps) and replaces what is left. A swap
        // pays off exactly on a mutual pair (a,b)/(b,a); with type counts
        // cnt[a][b] = #{p: s[p]=a != t[p]=b}, the largest swap matching is
        // sum min(cnt[a][b], cnt[b][a]), and the part costs wrong - pairs,
        // or 1 + wrong' - pairs' when reversed first.
        int n = word1.length();
        int[][] cost = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int[][] cnt = new int[26][26];
                int[][] cntRev = new int[26][26];
                int wrong = 0,
                    wrongRev = 0;
                for (int p = i; p <= j; p++) {
                    int a = word1.charAt(p) - 'a',
                        b = word2.charAt(p) - 'a';
                    if (a != b) {
                        wrong++;
                        cnt[a][b]++;
                    }
                    int aRev = word1.charAt(j - (p - i)) - 'a';
                    if (aRev != b) {
                        wrongRev++;
                        cntRev[aRev][b]++;
                    }
                }
                cost[i][j] = Math.min(wrong - swapPairs(cnt), 1 + wrongRev - swapPairs(cntRev));
            }
        }
        // Partition DP over prefix lengths; costs add across parts.
        int[] best = new int[n + 1];
        java.util.Arrays.fill(best, 1, n + 1, Integer.MAX_VALUE);
        for (int end = 1; end <= n; end++) for (int start = 0; start < end; start++) best[end] = Math.min(
            best[end],
            best[start] + cost[start][end - 1]
        );
        return best[n];
    }

    private int swapPairs(int[][] cnt) {
        int total = 0;
        for (int a = 0; a < 26; a++) for (int b = a + 1; b < 26; b++) total += Math.min(cnt[a][b], cnt[b][a]);
        return total;
    }
}
