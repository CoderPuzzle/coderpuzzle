class Solution {
  public:
    int buttonWithLongestTime(vector<vector<int>> &events) {
        // Press i takes time_i - time_{i-1} (its own time_i for the first
        // press). Keep the best press seen so far, replacing it on a
        // strictly longer time, or on an equal time from a smaller button
        // index — the statement's tie rule.
        int best_index = events[0][0];
        int best_taken = events[0][1];
        for (int i = 1; i < (int)events.size(); ++i) {
            int index = events[i][0];
            int taken = events[i][1] - events[i - 1][1];
            if (taken > best_taken || (taken == best_taken && index < best_index)) {
                best_index = index;
                best_taken = taken;
            }
        }
        return best_index;
    }
};
