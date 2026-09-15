class Solution {

    public int maxRotateFunction(int[] nums) {
        int n = nums.length;
        int total = 0;
        // F(0) weights each element by its index; every later rotation follows
        // from the recurrence, so only the running value is kept.
        int current = 0;
        for (int i = 0; i < n; ++i) {
            total += nums[i];
            current += i * nums[i];
        }
        int best = current;
        for (int k = 1; k < n; ++k) {
            // One more rotation promotes every element's weight by 1 and
            // demotes nums[n-k] from weight n-1 to weight 0.
            current += total - n * nums[n - k];
            best = Math.max(best, current);
        }
        return best;
    }
}
