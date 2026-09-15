import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int maxWidthRamp(int[] nums) {
        // Monotonic stack of record lows: an index matters as a left end
        // only when no earlier index holds a smaller value.
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < nums.length; ++i) {
            if (stack.isEmpty() || nums[stack.peek()] > nums[i]) {
                stack.push(i);
            }
        }
        // Right-to-left: the first (largest) j that dominates a stack top
        // pops it at that top's widest possible width.
        int best = 0;
        for (int j = nums.length - 1; j >= 0; --j) {
            while (!stack.isEmpty() && nums[stack.peek()] <= nums[j]) {
                best = Math.max(best, j - stack.pop());
            }
        }
        return best;
    }
}
