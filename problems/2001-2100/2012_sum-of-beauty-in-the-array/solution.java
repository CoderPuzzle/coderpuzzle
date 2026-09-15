class Solution {

    public int sumOfBeauties(int[] nums) {
        int n = nums.length;
        int[] prefix = new int[n];
        int[] suffix = new int[n];
        for (int index = 1; index < n; ++index) {
            prefix[index] = Math.max(prefix[index - 1], nums[index - 1]);
        }
        suffix[n - 2] = nums[n - 1];
        for (int index = n - 3; index >= 1; --index) {
            suffix[index] = Math.min(suffix[index + 1], nums[index + 1]);
        }

        int beauty = 0;
        for (int index = 1; index < n - 1; ++index) {
            if (prefix[index] < nums[index] && nums[index] < suffix[index]) {
                beauty += 2;
            } else if (nums[index - 1] < nums[index] && nums[index] < nums[index + 1]) {
                beauty += 1;
            }
        }
        return beauty;
    }
}
