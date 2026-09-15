class Solution {
  public:
    int largestRectangleArea(vector<int> &heights) {
        int n = heights.size();
        // Stack of indices whose heights are strictly increasing. For any
        // bar, the widest full-height rectangle spans the nearest strictly
        // shorter bar on each side; the scan finds both boundaries
        // implicitly. Each index is pushed once and popped at most once,
        // so the nested while keeps the whole pass linear.
        vector<int> stack;
        int best = 0;
        for (int i = 0; i <= n; i++) {
            // h = 0 at i == n is a sentinel: shorter than everything, it
            // flushes every remaining bar without adding area itself.
            int h = i == n ? 0 : heights[i];
            // A shorter bar has arrived: every stack bar taller than h just
            // found its right boundary, the current index i. Strict `>`
            // leaves equal heights on the stack, so an equal run still
            // computes its full width when finally flushed.
            while (!stack.empty() && heights[stack.back()] > h) {
                int height = heights[stack.back()];
                stack.pop_back();
                // Left boundary is the new top (nearest still strictly
                // shorter bar), or -1 when the rectangle reaches the start.
                int left = stack.empty() ? -1 : stack.back();
                best = max(best, height * (i - left - 1));
            }
            stack.push_back(i);
        }
        return best;
    }
};
