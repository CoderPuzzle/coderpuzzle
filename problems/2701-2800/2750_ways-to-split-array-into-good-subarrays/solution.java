class Solution {

    public int numberOfGoodSubarraySplits(int[] nums) {
        final int MOD = 1000000007;
        long answer = 0;
        int prev = -1; // index of the previous 1; -1 means none seen yet
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 1) {
                if (prev == -1) {
                    // First 1 found: the array is splittable, empty product = 1.
                    answer = 1;
                } else {
                    // residue * factor < (1e9+7) * 1e5 < 2^63 — exact in long.
                    answer = (answer * (i - prev)) % MOD;
                }
                prev = i;
            }
        }
        return (int) answer;
    }
}
