import java.util.Arrays;

class Solution {

    public long minIncrementForUnique(int[] nums) {
        // Sorted, an element never regrets landing on the first free value
        // above its predecessor's final value — anything higher wastes moves.
        Arrays.sort(nums);
        long moves = 0;
        int prev = nums[0];
        for (int i = 1; i < nums.length; ++i) {
            int need = prev + 1 - nums[i];
            if (need > 0) {
                moves += need;
                prev = nums[i] + need;
            } else {
                prev = nums[i];
            }
        }
        return moves;
    }
}
