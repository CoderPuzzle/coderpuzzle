class Solution {
  public:
    bool checkArray(vector<int> &nums, int k) {
        int n = nums.size();
        vector<long long> diff(n + 1, 0);
        // running: net number of still-active windows covering i (a
        // difference array recovers it in O(1)). Operations can be replayed
        // left to right: the leftmost nonzero cell can only be reduced by a
        // window starting exactly there.
        long long running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            // Residual after the already-started windows.
            long long cur = nums[i] - running;
            // Negative: earlier windows over-decremented this cell, and no
            // later operation can undo that.
            if (cur < 0) {
                return false;
            }
            if (cur == 0) {
                continue;
            }
            // Positive: exactly cur new windows must start at i (nothing
            // further left can help) — they must fit before the array ends.
            if (i + k > n) {
                return false;
            }
            running += cur;
            diff[i + k] -= cur;
        }
        return true;
    }
};
