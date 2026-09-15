class Solution {
  public:
    vector<int> findMissingAndRepeatedValues(vector<vector<int>> &grid) {
        // The grid holds [1, n*n] once each except one value twice and one
        // value never: flag each value in a seen array during one pass, and
        // a re-flagged value is the repeated a; the lone unflagged slot
        // afterward is the missing b.
        int n = grid.size();
        vector<char> seen(n * n + 1, 0);
        int a = 0;
        for (const auto &row : grid) {
            for (int v : row) {
                if (seen[v]) {
                    a = v;
                }
                seen[v] = 1;
            }
        }
        int b = 1;
        while (seen[b]) {
            ++b;
        }
        return {a, b};
    }
};
