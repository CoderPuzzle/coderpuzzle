class Solution {

    public boolean canMakeEqual(int[] nums, int k) {
        // Position i is touched only by the flips at i - 1 and at i, so
        // scanning left to right every flip is forced: prev remembers
        // whether the flip at i - 1 fired, and the flip at i must fire
        // exactly when the resulting value misses the target.
        return canMake(nums, 1, k) || canMake(nums, -1, k);
    }

    private boolean canMake(int[] nums, int target, int k) {
        int ops = 0;
        boolean prev = false;
        for (int i = 0; i + 1 < nums.length; i++) {
            prev = nums[i] * (prev ? -1 : 1) != target;
            if (prev) ops++;
        }
        // The last element has no flip of its own left: the target is only
        // reachable if it already came out right.
        return nums[nums.length - 1] * (prev ? -1 : 1) == target && ops <= k;
    }
}
