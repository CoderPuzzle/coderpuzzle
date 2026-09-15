class Solution {
  public:
    // Only restricted points (plus building 1 at height 0) matter. Sort
    // by id; two passes make each cap consistent with reachability from
    // its neighbors; between consecutive pinned points the best peak is
    // the floor of (lh + rh + gap) / 2, and past the last pin the height
    // simply ramps to its cap + distance.
    int maxBuilding(int n, vector<vector<int>> &restrictions) {
        vector<pair<long long, long long>> points;
        points.emplace_back(1, 0);
        for (auto &r : restrictions) {
            points.emplace_back(r[0], r[1]);
        }
        sort(points.begin(), points.end());
        for (size_t k = 1; k < points.size(); k++) {
            long long reachable = points[k - 1].second + (points[k].first - points[k - 1].first);
            if (reachable < points[k].second) {
                points[k].second = reachable;
            }
        }
        for (int k = (int)points.size() - 2; k >= 0; k--) {
            long long reachable = points[k + 1].second + (points[k + 1].first - points[k].first);
            if (reachable < points[k].second) {
                points[k].second = reachable;
            }
        }
        long long best = 0;
        for (size_t k = 1; k < points.size(); k++) {
            long long gap = points[k].first - points[k - 1].first;
            best = max(best, (points[k - 1].second + points[k].second + gap) / 2);
        }
        long long tail = points.back().second + (n - points.back().first);
        return (int)max(best, tail);
    }
};
