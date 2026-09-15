class Solution {

    public int countOfPairs(int[] nums) {
        // A pair is fixed once arr1 is chosen (arr2[i] = nums[i] - arr1[i]);
        // its rules collapse onto arr1: 0 <= arr1[i] <= nums[i], arr1
        // non-decreasing, and arr2 non-increasing, which together give
        // arr1[i] >= arr1[i - 1] + max(0, nums[i] - nums[i - 1]).
        //
        // pref[v] is the inclusive prefix sum of dp over values, so row i
        // reads pref[v - d] per value and is re-summed into the next pref;
        // each position costs O(max(nums)) instead of O(max(nums)^2),
        // which fits n = 2000 with values up to 1000. Every stored value
        // is reduced below 10^9 + 7 first, so a rebuilt entry stays under
        // 2 * (10^9 + 6), which fits in an int.
        final int MOD = 1_000_000_007;
        int[] pref = new int[nums[0] + 1];
        for (int v = 0; v <= nums[0]; v++) {
            pref[v] = v + 1; // dp[v] = 1 at i = 0
        }
        for (int i = 1; i < nums.length; i++) {
            int d = Math.max(0, nums[i] - nums[i - 1]);
            int[] next = new int[nums[i] + 1];
            int acc = 0;
            for (int v = 0; v <= nums[i]; v++) {
                int dp = v >= d ? pref[v - d] : 0;
                acc = (acc + dp) % MOD;
                next[v] = acc;
            }
            pref = next;
        }
        return pref[pref.length - 1];
    }
}
