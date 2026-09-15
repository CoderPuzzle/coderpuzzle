import java.util.Arrays;

class Solution {

    public long maxAlternatingSum(int[] nums) {
        // Squares erase signs, so sort the squared magnitudes and put the
        // largest ceil(n / 2) on the plus slots, the rest on minus slots.
        long[] squares = new long[nums.length];
        for (int index = 0; index < nums.length; index++) {
            squares[index] = (long) nums[index] * nums[index];
        }
        Arrays.sort(squares);
        int minus = nums.length / 2;
        long score = 0;
        for (int index = 0; index < squares.length; index++) {
            score += index < minus ? -squares[index] : squares[index];
        }
        return score;
    }
}
