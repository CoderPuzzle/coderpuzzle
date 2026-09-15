import java.util.Arrays;

class Solution {

    public int[] sortedSquares(int[] nums) {
        // The direct reading the follow-up names: square every element in
        // place, then let the language's sort produce the order. The input's
        // own arrangement is never consulted — squaring kills the sign, so
        // negatives need no case of their own.
        int[] squares = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            squares[i] = nums[i] * nums[i];
        }
        Arrays.sort(squares);
        return squares;
    }
}
