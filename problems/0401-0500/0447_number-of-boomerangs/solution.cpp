class Solution {
  public:
    int numberOfBoomerangs(vector<vector<int>> &points) {
        long long total = 0;
        for (int i = 0; i < (int)points.size(); ++i) {
            // A boomerang is pinned by its apex: the other two points merely
            // have to sit at the same distance from it, so group every other
            // point by squared distance — equal squares mean equal lengths,
            // and no square root ever gets the chance to round.
            unordered_map<long long, int> counts;
            for (int j = 0; j < (int)points.size(); ++j) {
                if (j == i)
                    continue;
                long long dx = points[j][0] - points[i][0];
                long long dy = points[j][1] - points[i][1];
                counts[dx * dx + dy * dy]++;
            }
            // c points at one distance fill the two ordered slots of the
            // tuple in c * (c - 1) ways — either of them may come first.
            for (const auto &[key, c] : counts) {
                total += (long long)c * (c - 1);
            }
        }
        return (int)total;
    }
};
