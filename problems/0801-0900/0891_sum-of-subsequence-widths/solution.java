import java.util.Arrays;

class Solution {

    public int sumSubseqWidths(int[] nums) {
        final long MOD = 1000000007L;
        // Width = max - min, so the total is the sum of subsequence maxes
        // minus mins; sorting loses nothing (inner order is irrelevant).
        Arrays.sort(nums);
        int n = nums.length;
        long[] pow2 = new long[n];
        pow2[0] = 1;
        for (int i = 1; i < n; i++) {
            pow2[i] = (pow2[i - 1] * 2) % MOD;
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            // nums[i] is the max of 2^i subsequences (partners chosen before
            // it) and the min of 2^(n-1-i); each subsequence is booked to
            // exactly one index per role. The extra +MOD repairs the possibly
            // negative difference of the two powers.
            long d = pow2[i] - pow2[n - 1 - i];
            total = (((total + nums[i] * d) % MOD) + MOD) % MOD;
        }
        return (int) total;
    }
}
