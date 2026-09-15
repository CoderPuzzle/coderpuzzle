class Solution {
  public:
    bool isReflected(vector<vector<int>> &points) {
        // Reflection swaps the extreme columns, so the only axis that can
        // work is x = (min_x + max_x) / 2: pin the sum s = min_x + max_x.
        int minX = points[0][0], maxX = points[0][0];
        unordered_set<long long> seen;
        for (const vector<int> &point : points) {
            minX = min(minX, point[0]);
            maxX = max(maxX, point[0]);
            seen.insert(((long long)point[0] << 32) | (unsigned int)point[1]);
        }
        // The axis may fall between columns, so mirror with the integer sum:
        // every point needs its partner (s - x, y) in the set, where repeated
        // points simply collapse.
        long long s = minX + maxX;
        for (const vector<int> &point : points) {
            long long mirrorX = s - point[0];
            if (!seen.count((mirrorX << 32) | (unsigned int)point[1]))
                return false;
        }
        return true;
    }
};
