class Solution {

    public int triangularSum(int[] nums) {
        int length = nums.length;
        while (length > 1) {
            for (int i = 0; i + 1 < length; i++) {
                nums[i] = (nums[i] + nums[i + 1]) % 10;
            }
            length--;
        }
        return nums[0];
    }
}
