class Solution {

    public int countMaxOrSubsets(int[] nums) {
        int maximum = 0;
        for (int value : nums) maximum |= value;
        return count(nums, 0, 0, maximum);
    }

    private int count(int[] nums, int index, int current, int maximum) {
        if (index == nums.length) return current == maximum ? 1 : 0;
        return count(nums, index + 1, current, maximum) + count(nums, index + 1, current | nums[index], maximum);
    }
}
