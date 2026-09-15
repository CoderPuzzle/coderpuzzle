class Solution {

    public int smallestDivisor(int[] nums, int threshold) {
        int hi = Integer.MIN_VALUE;
        for (int x : nums) hi = Math.max(hi, x);
        // The ceiled sum is non-increasing in the divisor, so "sum <=
        // threshold" is monotone: lower-bound search for the smallest valid d.
        // Past max(nums) every term is already 1, capping the range.
        int lo = 1;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (total(nums, mid) <= threshold) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    // (x + d - 1) / d is the float-free ceiling of x / d.
    private long total(int[] nums, int divisor) {
        long sum = 0;
        for (int x : nums) {
            sum += (x + divisor - 1) / divisor;
        }
        return sum;
    }
}
