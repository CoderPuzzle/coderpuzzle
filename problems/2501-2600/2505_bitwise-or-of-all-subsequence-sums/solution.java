class Solution {

    public long subsequenceSumOr(int[] nums) {
        // Each element and each running prefix is itself a subsequence sum,
        // and together they carry every bit the full OR can raise, so one
        // pass folds both into the answer. Prefixes reach 10^14, hence long.
        long ans = 0;
        long pre = 0;
        for (int x : nums) {
            pre += x;
            ans |= x | pre;
        }
        return ans;
    }
}
