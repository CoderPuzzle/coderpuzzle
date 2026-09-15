class Solution {
  public:
    int nearestValidPoint(int x, int y, vector<vector<int>> &points) {
        // A valid point already agrees with one coordinate, so its Manhattan
        // distance is just the absolute gap on the other coordinate.
        int bestDist = INT_MAX;
        int bestIndex = -1;
        for (int i = 0; i < points.size(); i++) {
            int a = points[i][0];
            int b = points[i][1];
            if (a == x || b == y) {
                int dist = a == x ? abs(b - y) : abs(a - x);
                // Strict improvement only: an equal distance keeps the earlier
                // index, which is exactly the statement's tie rule.
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = i;
                }
            }
        }
        return bestIndex;
    }
};
