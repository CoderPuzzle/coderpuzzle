import java.util.Arrays;

class Solution {

    public int numSubseq(int[] nums, int target) {
        final int MOD = 1_000_000_007;
        // A subsequence is defined by membership, not order, so sorting loses
        // nothing; validity then depends only on smallest + largest <= target.
        Arrays.sort(nums);
        int n = nums.length;
        // Powers of two: elements strictly between the two pointers may be
        // included or excluded freely.
        long[] powers = new long[n];
        powers[0] = 1;
        for (int i = 1; i < n; i++) {
            powers[i] = (powers[i - 1] * 2) % MOD;
        }
        long total = 0;
        int lo = 0,
            hi = n - 1;
        while (lo <= hi) {
            if (nums[lo] + nums[hi] <= target) {
                // hi is the farthest legal partner of lo (earlier decrements
                // rule out anything beyond), so 2^(hi-lo) subsequences have
                // their minimum exactly at lo.
                total = (total + powers[hi - lo]) % MOD;
                lo++;
            } else {
                // nums[hi] is too large to pair with anything at or after lo.
                hi--;
            }
        }
        return (int) total;
    }
}
