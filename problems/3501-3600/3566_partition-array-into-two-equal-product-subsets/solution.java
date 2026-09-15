class Solution {

    public boolean checkEqualPartitions(int[] nums, long target) {
        // Enumerate every proper subset as one side; the mask's complement
        // is the other side. Products stop early once they exceed target,
        // so intermediates stay below target * 100 <= 1e17 — far inside
        // the long range.
        int n = nums.length;
        int full = (1 << n) - 1;
        for (int x : nums) {
            if (target % x != 0) {
                return false; // every element sits in a side, so each divides target
            }
        }
        for (int mask = 1; mask < full; mask++) {
            if (productWithin(nums, mask, target) == target && productWithin(nums, mask ^ full, target) == target) {
                return true;
            }
        }
        return false;
    }

    private long productWithin(int[] nums, int mask, long target) {
        long product = 1;
        for (int i = 0; i < nums.length; i++) {
            if (((mask >> i) & 1) == 1) {
                product *= nums[i];
                if (product > target) {
                    return -1;
                }
            }
        }
        return product;
    }
}
