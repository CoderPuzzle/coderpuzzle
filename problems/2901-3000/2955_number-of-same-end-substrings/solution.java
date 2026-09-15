class Solution {

    public int[] sameEndSubstringCount(String s, int[][] queries) {
        // cnt[c][j] = occurrences of letter c in s[:j]. A query answer is
        // the sum over letters of t*(t+1)/2 for the range frequency t: every
        // position pairs with itself, and each equal pair of positions is
        // one same-end substring. Max answer 450015000 fits in 32 bits.
        int n = s.length();
        int[][] cnt = new int[26][n + 1];
        for (int j = 1; j <= n; ++j) {
            for (int c = 0; c < 26; ++c) {
                cnt[c][j] = cnt[c][j - 1];
            }
            ++cnt[s.charAt(j - 1) - 'a'][j];
        }
        int[] ans = new int[queries.length];
        for (int k = 0; k < queries.length; ++k) {
            int l = queries[k][0],
                r = queries[k][1];
            int total = 0;
            for (int c = 0; c < 26; ++c) {
                int t = cnt[c][r + 1] - cnt[c][l];
                total += (t * (t + 1)) / 2;
            }
            ans[k] = total;
        }
        return ans;
    }
}
