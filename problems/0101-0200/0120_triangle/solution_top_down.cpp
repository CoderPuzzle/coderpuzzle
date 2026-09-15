class Solution {
  public:
    int minimumTotal(vector<vector<int>> &triangle) {
        int n = (int)triangle.size();
        // Top-down mirror of the bottom-up DP: best[i] = minimum path sum
        // from the apex down to column i of the current row. Sums
        // accumulate in long longs for headroom.
        vector<long long> best(n);
        best[0] = triangle[0][0];
        int width = 1;
        for (int row = 1; row < n; row++) {
            const vector<int> &cur = triangle[row];
            vector<long long> nxt(cur.size());
            // A cell descends from column i-1 or i of the row above, so
            // both ragged edge cells have a single parent.
            nxt[0] = cur[0] + best[0];
            for (int i = 1; i + 1 < (int)cur.size(); i++) {
                nxt[i] = cur[i] + min(best[i - 1], best[i]);
            }
            nxt[cur.size() - 1] = cur[cur.size() - 1] + best[width - 1];
            best = move(nxt);
            width = (int)cur.size();
        }
        // The answer is the cheapest cell on the final row.
        return (int)*min_element(best.begin(), best.begin() + width);
    }
};
