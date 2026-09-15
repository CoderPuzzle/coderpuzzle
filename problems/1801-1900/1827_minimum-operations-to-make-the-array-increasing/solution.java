class Solution {

    // Strict increase forces each element to at least prev + 1, and
    // lifting an element any higher only raises the floor of the next
    // one, so the cheapest reachable target is exactly that floor.
    public int minOperations(int[] nums) {
        int ops = 0;
        int prev = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int target = Math.max(prev + 1, nums[i]);
            ops += target - nums[i];
            prev = target;
        }
        return ops;
    }
}
