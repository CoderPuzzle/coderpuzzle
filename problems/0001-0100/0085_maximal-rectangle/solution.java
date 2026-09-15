import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int maximalRectangle(String[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int rows = matrix.length,
            cols = matrix[0].length;
        // Every all-ones rectangle has a bottom row, and that row sees a
        // histogram of consecutive-1 column heights; solving largest
        // rectangle once per row and taking the max covers them all.
        int[] heights = new int[cols];
        int best = 0;
        for (int r = 0; r < rows; r++) {
            // Fold the row in: '1' extends the run, '0' resets to 0 since a
            // rectangle cannot span a zero.
            for (int c = 0; c < cols; c++) {
                heights[c] = matrix[r][c].equals("1") ? heights[c] + 1 : 0;
            }
            int area = largestArea(heights);
            if (area > best) best = area;
        }
        return best;
    }

    // Largest rectangle under one row's histogram: monotonic stack of
    // column indices with strictly increasing heights.
    private int largestArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= n; i++) {
            // h = 0 at i == n is a sentinel that flushes whatever remains
            // on the stack at the end of the row.
            int h = i == n ? 0 : heights[i];
            // A shorter bar has arrived: every stack bar taller than h just
            // found its right boundary, the current index i. Strict `>`
            // leaves equal heights on the stack, so the earlier of two
            // equal bars accounts for the full run when finally popped.
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                // Left boundary is the new top (nearest strictly shorter
                // bar), or -1 when the rectangle reaches the start.
                int left = stack.isEmpty() ? -1 : stack.peek();
                int area = height * (i - left - 1);
                if (area > best) best = area;
            }
            stack.push(i);
        }
        return best;
    }
}
