class Solution {

    private static final long MOD = 1_000_000_007L;

    public int numWays(String s) {
        // A split into three equal-ones parts only exists when the total
        // number of '1's is a multiple of 3. With `total == 0` every
        // character is '0', so any pair of the n - 1 gaps between
        // characters is a valid pair of cut points: C(n - 1, 2) ways
        // (accumulated as a long since n can reach 1e5). Otherwise,
        // record the positions of every '1'; the first cut may land
        // anywhere between the k-th and (k + 1)-th one (a run of
        // trailing zeros widens that window), and likewise the second
        // cut between the 2k-th and (2k + 1)-th one. The two windows
        // never overlap, so the answer is the product of their widths.
        int n = s.length();
        int[] onesIdx = new int[n];
        int total = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                onesIdx[total++] = i;
            }
        }
        if (total % 3 != 0) {
            return 0;
        }
        if (total == 0) {
            long ways = ((long) (n - 1) * (n - 2)) / 2;
            return (int) (ways % MOD);
        }
        int k = total / 3;
        long left = onesIdx[k] - onesIdx[k - 1];
        long right = onesIdx[2 * k] - onesIdx[2 * k - 1];
        return (int) ((left * right) % MOD);
    }
}
