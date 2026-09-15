class Solution {

    public int sumOfPower(int[] nums, int k) {
        // A subsequence T with sum k and length j is contained in exactly
        // 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
        // where count[j][s] counts length-j subsequences of sum s — a 0/1
        // knapsack filled with j and s both descending. Elements above k can
        // never join a sum-k subsequence, so they are skipped outright. The
        // weight products reach ~10^18, so the reduction runs in long.
        final int MOD = 1_000_000_007;
        int n = nums.length;
        int[][] counts = new int[n + 1][k + 1];
        counts[0][0] = 1;
        int used = 0;
        for (int num : nums) {
            if (num > k) {
                continue;
            }
            used++;
            for (int j = used; j > 0; j--) {
                for (int s = k; s >= num; s--) {
                    counts[j][s] = (counts[j][s] + counts[j - 1][s - num]) % MOD;
                }
            }
        }
        long total = 0;
        long power = 1;
        for (int j = n; j > 0; j--) {
            total = (total + counts[j][k] * power) % MOD;
            power = (power * 2) % MOD;
        }
        return (int) total;
    }
}
