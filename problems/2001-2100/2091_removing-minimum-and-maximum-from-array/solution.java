class Solution {

    public int minimumDeletions(int[] nums) {
        int minimumIndex = 0;
        int maximumIndex = 0;
        for (int index = 1; index < nums.length; index++) {
            if (nums[index] < nums[minimumIndex]) {
                minimumIndex = index;
            }
            if (nums[index] > nums[maximumIndex]) {
                maximumIndex = index;
            }
        }

        int left = Math.min(minimumIndex, maximumIndex);
        int right = Math.max(minimumIndex, maximumIndex);
        int fromFront = right + 1;
        int fromBack = nums.length - left;
        int fromBoth = left + 1 + nums.length - right;
        return Math.min(fromFront, Math.min(fromBack, fromBoth));
    }
}
