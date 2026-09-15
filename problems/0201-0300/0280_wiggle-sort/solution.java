class Solution {

    public int[] wiggleSort(int[] nums) {
        // One pass: each pair demands its own relation, and repairing a
        // violated pair with a single swap never re-breaks the pair before it.
        for (int i = 1; i < nums.length; ++i) {
            // Odd i demands nums[i-1] <= nums[i]; even i demands nums[i-1] >= nums[i].
            boolean violation = i % 2 == 1 ? nums[i - 1] > nums[i] : nums[i - 1] < nums[i];
            if (violation) {
                int tmp = nums[i - 1];
                nums[i - 1] = nums[i];
                nums[i] = tmp;
            }
        }
        return nums;
    }
}
