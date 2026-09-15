class Solution {

    public int movesToMakeZigzag(int[] nums) {
        return Math.min(cost(nums, 0), cost(nums, 1));
    }

    private int cost(int[] nums, int valleyParity) {
        int moves = 0;
        for (int i = valleyParity; i < nums.length; i += 2) {
            // Valley must drop below both neighbors; the neighbors are
            // peaks of the other parity and never get decreased.
            int bound = Integer.MAX_VALUE;
            if (i > 0) bound = Math.min(bound, nums[i - 1]);
            if (i + 1 < nums.length) bound = Math.min(bound, nums[i + 1]);
            if (nums[i] >= bound) moves += nums[i] - bound + 1;
        }
        return moves;
    }
}
