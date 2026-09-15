class Solution {

    public int[] minBitwiseArray(int[] nums) {
        // a OR (a + 1) always ends in a 1 bit, hence odd -- the only even
        // prime is 2, which reports -1. For odd x the minimum clears the
        // highest bit of x's trailing run of 1s: its lower neighbors stay 1
        // in a, so a + 1 carries exactly onto the cleared bit and
        // a OR (a + 1) rebuilds x, while clearing any lower bit of the run
        // leaves a larger candidate. The cleared bit is half the lowest set
        // bit of x + 1, since x + 1 zeros the whole run. Values stay below
        // 1e9 + 1, inside int range.
        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) {
            int x = nums[i];
            if (x % 2 == 0) {
                ans[i] = -1;
            } else {
                int low = (x + 1) & -(x + 1);
                ans[i] = x - (low >> 1);
            }
        }
        return ans;
    }
}
