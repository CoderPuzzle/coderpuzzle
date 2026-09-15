class Solution {
  public:
    int minimizeTheDifference(vector<vector<int>> &mat, int target) {
        // Reachable sums as a boolean table: sum s is reachable after the
        // rows processed so far. The largest possible total bounds the table.
        int maxSum = 0;
        for (const auto &row : mat) {
            int rowMax = 0;
            for (int value : row)
                rowMax = max(rowMax, value);
            maxSum += rowMax;
        }
        vector<bool> reachable(maxSum + 1, false);
        reachable[0] = true;
        for (const auto &row : mat) {
            vector<bool> next(maxSum + 1, false);
            for (int s = 0; s <= maxSum; ++s) {
                if (!reachable[s])
                    continue;
                for (int value : row) {
                    if (s + value <= maxSum)
                        next[s + value] = true;
                }
            }
            reachable = move(next);
        }
        // Closest set slot below target, then the smallest one above it.
        int best = -1;
        for (int s = min(target, maxSum); s >= 0; --s) {
            if (reachable[s]) {
                best = target - s;
                break;
            }
        }
        for (int s = target + 1; s <= maxSum; ++s) {
            if (reachable[s]) {
                int gap = s - target;
                if (best < 0 || gap < best)
                    best = gap;
                break;
            }
        }
        return best;
    }
};
