class Solution {
  public:
    int maximalRectangle(vector<vector<string>> &matrix) {
        if (matrix.empty() || matrix[0].empty())
            return 0;
        int rows = matrix.size(), cols = matrix[0].size();
        // Every all-ones rectangle has a bottom row, and that row sees a
        // histogram of consecutive-1 column heights; solving largest
        // rectangle once per row and taking the max covers them all.
        vector<int> heights(cols, 0);
        int best = 0;
        for (int r = 0; r < rows; r++) {
            // Fold the row in: '1' extends the run, '0' resets to 0 since a
            // rectangle cannot span a zero.
            for (int c = 0; c < cols; c++) {
                heights[c] = matrix[r][c] == "1" ? heights[c] + 1 : 0;
            }
            best = max(best, largestArea(heights));
        }
        return best;
    }

  private:
    // Largest rectangle under one row's histogram: monotonic stack of
    // column indices with strictly increasing heights.
    int largestArea(vector<int> &heights) {
        int n = heights.size();
        vector<int> stack;
        int best = 0;
        for (int i = 0; i <= n; i++) {
            // h = 0 at i == n is a sentinel that flushes whatever remains
            // on the stack at the end of the row.
            int h = i == n ? 0 : heights[i];
            // A shorter bar has arrived: every stack bar taller than h just
            // found its right boundary, the current index i. Strict `>`
            // leaves equal heights on the stack, so the earlier of two
            // equal bars accounts for the full run when finally popped.
            while (!stack.empty() && heights[stack.back()] > h) {
                int height = heights[stack.back()];
                stack.pop_back();
                // Left boundary is the new top (nearest strictly shorter
                // bar), or -1 when the rectangle reaches the start.
                int left = stack.empty() ? -1 : stack.back();
                best = max(best, height * (i - left - 1));
            }
            stack.push_back(i);
        }
        return best;
    }
};
