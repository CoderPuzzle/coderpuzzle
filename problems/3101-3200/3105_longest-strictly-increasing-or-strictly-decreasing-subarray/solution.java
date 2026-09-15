class Solution {

    public int longestMonotonicSubarray(int[] nums) {
        int best = 1;
        int inc = 1;
        int dec = 1;
        for (int index = 1; index < nums.length; index++) {
            if (nums[index] > nums[index - 1]) {
                inc++;
                dec = 1;
            } else if (nums[index] < nums[index - 1]) {
                dec++;
                inc = 1;
            } else {
                inc = 1;
                dec = 1;
            }
            best = Math.max(Math.max(best, inc), dec);
        }
        return best;
    }
}
