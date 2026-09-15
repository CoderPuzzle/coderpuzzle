class Solution {
  public:
    vector<int> fallingSquares(vector<vector<int>> &positions) {
        // Coordinate compression: every left and right edge becomes a cell
        // boundary, so each square's footprint is a run of compressed cells
        // and touching edges share no cell — exactly the brushing rule.
        // Heights stay in int range: at most 1000 * 10^6 = 10^9 < 2^31.
        int n = positions.size();
        vector<int> coords;
        coords.reserve(2 * n);
        for (const vector<int> &square : positions) {
            coords.push_back(square[0]);
            coords.push_back(square[0] + square[1]);
        }
        sort(coords.begin(), coords.end());
        coords.erase(unique(coords.begin(), coords.end()), coords.end());
        int m = coords.size();
        // heights[k] is the top height over the cell [coords[k], coords[k+1]).
        vector<int> heights(m, 0);
        vector<int> ans;
        ans.reserve(n);
        int best = 0;
        for (const vector<int> &square : positions) {
            int lo = lower_bound(coords.begin(), coords.end(), square[0]) - coords.begin();
            int hi = lower_bound(coords.begin(), coords.end(), square[0] + square[1]) - coords.begin();
            // The square lands on the tallest top among the cells it covers.
            int top = square[1];
            for (int cell = lo; cell < hi; ++cell) {
                top = max(top, square[1] + heights[cell]);
            }
            for (int cell = lo; cell < hi; ++cell) {
                heights[cell] = top;
            }
            best = max(best, top);
            ans.push_back(best);
        }
        return ans;
    }
};
