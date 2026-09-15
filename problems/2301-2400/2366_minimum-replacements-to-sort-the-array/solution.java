class Solution {

    public long minimumReplacement(int[] nums) {
        // Splitting only shrinks numbers, so never touch the last element:
        // keep `bound` = max value allowed here given a sorted suffix.
        long ops = 0;
        long bound = nums[nums.length - 1];
        for (int i = nums.length - 2; i >= 0; i--) {
            long x = nums[i];
            if (x <= bound) {
                // Already fits the sorted suffix; it tightens the bound.
                bound = x;
            } else {
                // Fewest pieces covering sum x with each <= bound; k even
                // pieces leave the largest at ceil(x/k) <= bound.
                long k = (x + bound - 1) / bound;
                ops += k - 1;
                // Even split maximizes the smallest piece (floor(x/k)),
                // leaving the most room for elements further left.
                bound = x / k;
            }
        }
        return ops;
    }
}
