class Solution {

    public boolean isZeroArray(int[] nums, int[][] queries) {
        int n = nums.length;
        // Difference array: +1 at l and -1 at r+1 per query; the spare slot
        // at index n absorbs the r+1 == n write without a bounds check.
        int[] diff = new int[n + 1];
        for (int[] q : queries) {
            diff[q[0]] += 1;
            diff[q[1] + 1] -= 1;
        }
        int coverage = 0;
        // The prefix sum recovers how many queries cover each index. Each
        // covering query removes at most one unit there, so zeroing is
        // possible iff coverage never falls below nums[i].
        for (int i = 0; i < n; i++) {
            coverage += diff[i];
            if (coverage < nums[i]) return false;
        }
        return true;
    }
}
