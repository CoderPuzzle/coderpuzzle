class Solution {

    public int minimumSize(int[] nums, int maxOperations) {
        // Achievability is monotone in the penalty, so binary search the
        // smallest feasible value; max(nums) needs zero operations.
        int lo = 1;
        int hi = 0;
        for (int balls : nums) {
            hi = Math.max(hi, balls);
        }
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (needed(nums, mid) <= maxOperations) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    // A bag of v must end as ceil(v/penalty) pieces; each division creates
    // exactly one new bag, so it costs ceil(v/penalty) - 1 = (v - 1) /
    // penalty operations — achievable with near-equal splits, all of size
    // <= penalty.
    private long needed(int[] nums, int penalty) {
        long total = 0;
        for (int balls : nums) {
            total += (balls - 1) / penalty;
        }
        return total;
    }
}
