class Solution {
  public:
    int minTimeToVisitAllPoints(vector<vector<int>> &points) {
        // Each second closes at most one unit of each axis (the diagonal),
        // so a leg takes exactly max(|dx|, |dy|) seconds — walk diagonally
        // while both gaps are open, then straight along what remains.
        int total = 0;
        for (size_t i = 1; i < points.size(); ++i) {
            total += max(abs(points[i][0] - points[i - 1][0]), abs(points[i][1] - points[i - 1][1]));
        }
        return total;
    }
};
