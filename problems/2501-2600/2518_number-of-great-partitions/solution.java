import java.util.Arrays;

class Solution {

    public int countPartitions(int[] nums, int k) {
        // Reverse view per the hint: a partition fails when either group's
        // sum lands under k, and both failures coincide only if the total
        // is under 2*k -- then zero great partitions exist outright.
        // Otherwise every subset with sum < k names one failure per side,
        // so the answer is 2^n minus twice their count.
        final long MOD = 1000000007L;
        long total = Arrays.stream(nums).asLongStream().sum();
        if (total < 2L * k) return 0;
        // ways[s] holds, mod p, how many subsets of the processed prefix
        // sum to s; rows at k and beyond can never come back below k.
        long[] ways = new long[k];
        ways[0] = 1;
        for (int value : nums) {
            for (int s = k - 1; s >= value; --s) ways[s] = (ways[s] + ways[s - value]) % MOD;
        }
        // Fewer than 1000 rows below the modulus: summing them is safe.
        long below = 0;
        for (long count : ways) below += count;
        below %= MOD;
        long power = 1;
        for (int i = 0; i < nums.length; ++i) power = (power * 2) % MOD;
        return (int) ((power - ((2 * below) % MOD) + MOD) % MOD);
    }
}
