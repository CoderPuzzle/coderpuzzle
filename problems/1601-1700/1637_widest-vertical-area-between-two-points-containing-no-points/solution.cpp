class Solution {
  public:
    int maxWidthOfVerticalArea(vector<vector<int>> &points) {
        vector<int> xs;
        xs.reserve(points.size());
        for (const auto &point : points) {
            xs.push_back(point[0]);
        }
        sort(xs.begin(), xs.end());

        int widest = 0;
        for (size_t i = 1; i < xs.size(); i++) {
            widest = max(widest, xs[i] - xs[i - 1]);
        }
        return widest;
    }
};
