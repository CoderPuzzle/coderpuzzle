class Solution {

    public int rearrangeSticks(int n, int k) {
        final long MOD = 1_000_000_007L;
        // cur[j] = f(i, j): i sticks, j visible
        long[] cur = new long[k + 1];
        cur[0] = 1; // f(0, 0)
        for (int i = 1; i <= n; i++) {
            long[] nxt = new long[k + 1];
            for (int j = 1; j <= k; j++) {
                nxt[j] = (cur[j - 1] + (i - 1) * cur[j]) % MOD;
            }
            cur = nxt;
        }
        return (int) cur[k];
    }
}
