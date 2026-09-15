import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean find132pattern(int[] nums) {
        if (nums.length < 3) {
            return false;
        }
        Deque<Integer> stack = new ArrayDeque<>();
        // Scan right-to-left; `third` is the largest value known to sit
        // after something bigger — the best nums[k] candidate (MIN = none
        // yet).
        long third = Long.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
            int value = nums[i];
            // Current value below third makes it a valid nums[i]; the pair
            // that produced third lies entirely to its right.
            if (value < third) {
                return true;
            }
            // Popped values are smaller than `value` and lie to its right,
            // so each has a larger number before it; the last (largest)
            // popped becomes third. The stack stays decreasing.
            while (!stack.isEmpty() && stack.peek() < value) {
                third = stack.pop();
            }
            stack.push(value);
        }
        return false;
    }
}
