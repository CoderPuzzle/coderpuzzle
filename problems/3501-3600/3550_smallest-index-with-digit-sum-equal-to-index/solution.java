class Solution {

    public int smallestIndex(int[] nums) {
        // First index whose digit sum equals the index wins, so a single
        // left-to-right scan with an early return is all there is. Values
        // are at most 1000, so each digit sum is at most 27 -- well below
        // any index bound of 100.
        for (int i = 0; i < nums.length; i++) {
            int s = 0;
            for (int v = nums[i]; v > 0; v /= 10) {
                s += v % 10;
            }
            if (s == i) {
                return i;
            }
        }
        return -1;
    }
}
