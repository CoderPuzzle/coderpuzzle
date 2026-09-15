class Solution {
  public:
    long long maxArea(vector<vector<int>> &coords) {
        // A valid triangle needs a horizontal or vertical side. On a
        // horizontal line y the widest base is the x-span of that
        // line, and the tallest apex is the global top or bottom
        // point, whichever lies off the line — so every line
        // contributes two O(1) candidates once points are grouped.
        // Vertical sides mirror this. 2 * area <= 2 * (10^6)^2, so
        // long long math is required.
        unordered_map<int, vector<int>> byY, byX;
        for (auto &p : coords) {
            byY[p[1]].push_back(p[0]);
            byX[p[0]].push_back(p[1]);
        }
        int gxmin = INT_MAX, gxmax = INT_MIN;
        int gymin = INT_MAX, gymax = INT_MIN;
        for (auto &[x, _] : byX) {
            gxmin = min(gxmin, x);
            gxmax = max(gxmax, x);
        }
        for (auto &[y, _] : byY) {
            gymin = min(gymin, y);
            gymax = max(gymax, y);
        }
        long long best = -1;
        for (auto &[y, row] : byY) {
            if (row.size() < 2)
                continue;
            int lo = *min_element(row.begin(), row.end());
            int hi = *max_element(row.begin(), row.end());
            if (gymax != y)
                best = max(best, (long long)(hi - lo) * (gymax - y));
            if (gymin != y)
                best = max(best, (long long)(hi - lo) * (y - gymin));
        }
        for (auto &[x, col] : byX) {
            if (col.size() < 2)
                continue;
            int lo = *min_element(col.begin(), col.end());
            int hi = *max_element(col.begin(), col.end());
            if (gxmax != x)
                best = max(best, (long long)(hi - lo) * (gxmax - x));
            if (gxmin != x)
                best = max(best, (long long)(hi - lo) * (x - gxmin));
        }
        return best;
    }
};
