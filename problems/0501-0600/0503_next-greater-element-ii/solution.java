import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        // One extra lap simulates the wrap-around without copying the
        // array; the resolver of any waiting index lies within one cycle
        // ahead.
        for (int i = 0; i < 2 * n; i++) {
            int idx = i % n;
            // The stack holds indices with non-increasing values; the
            // current circular value is the first strictly greater one
            // ahead of each popped index (equal values are not popped).
            while (!stack.isEmpty() && nums[stack.peek()] < nums[idx]) {
                result[stack.pop()] = nums[idx];
            }
            // Push only during the first lap; the second just resolves.
            if (i < n) {
                stack.push(idx);
            }
        }
        return result;
    }
}
