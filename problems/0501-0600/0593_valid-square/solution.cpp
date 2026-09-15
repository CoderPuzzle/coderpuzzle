class Solution {
  public:
    bool validSquare(vector<int> &p1, vector<int> &p2, vector<int> &p3, vector<int> &p4) {
        vector<vector<int>> points = {p1, p2, p3, p4};
        vector<long long> d2;
        // Six pairs hide among four points — four sides and two diagonals.
        // Grouping by squared length compares exactly what distances
        // compare, so no square root ever gets the chance to round.
        for (int i = 0; i < 4; ++i) {
            for (int j = i + 1; j < 4; ++j) {
                long long dx = points[j][0] - points[i][0];
                long long dy = points[j][1] - points[i][1];
                d2.push_back(dx * dx + dy * dy);
            }
        }
        sort(d2.begin(), d2.end());
        // Sorted, a square is exactly the multiset a, a, a, a, b, b: the
        // four equal sides come first and the two equal diagonals after,
        // with a > 0 so a collapsed point cannot pose as a side.
        return d2[0] > 0 && d2[0] == d2[3] && d2[4] == d2[5] && d2[3] != d2[4];
    }
};
