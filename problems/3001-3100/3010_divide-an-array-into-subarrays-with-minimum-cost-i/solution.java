class Solution {

    public int minimumCost(int[] nums) {
        int smallest = Math.min(nums[1], nums[2]);
        int second = Math.max(nums[1], nums[2]);
        for (int index = 3; index < nums.length; index++) {
            int value = nums[index];
            if (value < smallest) {
                second = smallest;
                smallest = value;
            } else if (value < second) {
                second = value;
            }
        }
        return nums[0] + smallest + second;
    }
}
