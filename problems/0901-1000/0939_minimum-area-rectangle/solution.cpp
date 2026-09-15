class Solution {
  public:
    int minAreaRect(vector<vector<int>> &points) {
        // A rectangle with sides parallel to the axes is pinned by two
        // opposite corners: (x1, y1) and (x2, y2) with x1 != x2 and
        // y1 != y2 close one exactly when (x1, y2) and (x2, y1) are also
        // present, and its area is |x1 - x2| * |y1 - y2|. Coordinates lie
        // in [0, 40000], so x * 40001 + y encodes a point as one unique
        // 64-bit key, and every pair is tried as a candidate diagonal
        // with two O(1) membership tests deciding whether the rectangle
        // exists.
        unordered_set<long long> seen;
        for (const vector<int> &point : points) {
            seen.insert((long long)point[0] * 40001 + point[1]);
        }
        int n = (int)points.size();
        int best = 0;
        for (int i = 0; i < n; ++i) {
            int x1 = points[i][0], y1 = points[i][1];
            for (int j = i + 1; j < n; ++j) {
                int x2 = points[j][0], y2 = points[j][1];
                if (x1 == x2 || y1 == y2)
                    continue; // a diagonal needs both coordinates to differ
                if (seen.count((long long)x1 * 40001 + y2) && seen.count((long long)x2 * 40001 + y1)) {
                    int area = abs(x1 - x2) * abs(y1 - y2);
                    if (best == 0 || area < best)
                        best = area;
                }
            }
        }
        return best;
    }
};
