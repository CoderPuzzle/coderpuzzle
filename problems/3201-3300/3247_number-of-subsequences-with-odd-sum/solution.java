class Solution {

    public int subsequenceCount(int[] nums) {
        // Carry the count of even-sum and odd-sum subsequences of the
        // scanned prefix; an even element doubles both counts, an odd one
        // makes both counts their sum. Values stay below 2 * (10^9 + 6),
        // which fits in an int.
        final int MOD = 1_000_000_007;
        int even = 1;
        int odd = 0;
        for (int num : nums) {
            if (num % 2 != 0) {
                int merged = (even + odd) % MOD;
                even = merged;
                odd = merged;
            } else {
                even = (even * 2) % MOD;
                odd = (odd * 2) % MOD;
            }
        }
        return odd;
    }
}
