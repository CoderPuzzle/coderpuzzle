import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        // Stack of indices whose heights are strictly increasing. For any
        // bar, the widest full-height rectangle spans the nearest strictly
        // shorter bar on each side; the scan finds both boundaries
        // implicitly. Each index is pushed once and popped at most once,
        // so the nested while keeps the whole pass linear.
        Deque<Integer> stack = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= n; i++) {
            // h = 0 at i == n is a sentinel: shorter than everything, it
            // flushes every remaining bar without adding area itself.
            int h = i == n ? 0 : heights[i];
            // A shorter bar has arrived: every stack bar taller than h just
            // found its right boundary, the current index i. Strict `>`
            // leaves equal heights on the stack, so an equal run still
            // computes its full width when finally flushed.
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                // Left boundary is the new top (nearest still strictly
                // shorter bar), or -1 when the rectangle reaches the start.
                int left = stack.isEmpty() ? -1 : stack.peek();
                int area = height * (i - left - 1);
                if (area > best) best = area;
            }
            stack.push(i);
        }
        return best;
    }
}
