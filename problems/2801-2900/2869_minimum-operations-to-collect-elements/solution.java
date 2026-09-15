class Solution {

    public int minOperations(int[] nums, int k) {
        // Operations only ever drop the last element, so after t operations
        // the collection is exactly the suffix of length t.
        boolean[] marked = new boolean[k + 1];
        int collected = 0;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] <= k && !marked[nums[i]]) {
                marked[nums[i]] = true;
                if (++collected == k) {
                    // The wanted values 1..k all sit in the removed suffix.
                    return nums.length - i;
                }
            }
        }
        // Unreachable for valid inputs: 1..k is guaranteed collectible.
        return nums.length;
    }
}
