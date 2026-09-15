import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] findMaximums(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        // Nearest strictly smaller element on each side. Popping on >= (not
        // just >) deliberately splits spans at equal values so every
        // duplicate owns the sub-window where it is the minimum.
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            // nums[i] is the minimum of any window within its maximal span,
            // so it seeds that length (max wins when spans collide).
            int length = right[i] - left[i] - 1;
            if (nums[i] > ans[length - 1]) {
                ans[length - 1] = nums[i];
            }
        }
        // Seeding covers only maximal spans: a size-(k+1) window contains a
        // size-k sub-window with a no-smaller minimum, so answers are
        // monotone and this suffix max repairs every shorter length with the
        // best longer-span guarantee.
        for (int i = n - 2; i >= 0; i--) {
            if (ans[i + 1] > ans[i]) {
                ans[i] = ans[i + 1];
            }
        }
        return ans;
    }
}
