class Solution {
  public:
    bool isBoomerang(vector<vector<int>> &points) {
        long long x1 = points[0][0], y1 = points[0][1];
        long long x2 = points[1][0], y2 = points[1][1];
        long long x3 = points[2][0], y3 = points[2][1];
        // Cross product of (p2 - p1) and (p3 - p1); zero exactly when the
        // two edge vectors are parallel, which also covers any duplicate
        // point (a zero vector is parallel to everything).
        long long cross = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
        return cross != 0;
    }
};
