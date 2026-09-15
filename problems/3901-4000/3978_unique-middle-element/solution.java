class Solution {

    public boolean isMiddleElementUnique(int[] nums) {
        int middle = nums[nums.length / 2];
        int count = 0;
        for (int value : nums) {
            if (value == middle) {
                count++;
            }
        }
        return count == 1;
    }
}
