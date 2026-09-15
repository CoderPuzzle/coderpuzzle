class Solution {
  public:
    int maxSumDistinctTriplet(vector<int> &x, vector<int> &y) {
        // Each x-value can enter the triplet at most once, so only its best
        // y matters: keep the maximum y per distinct x in a hash map.
        unordered_map<int, int> best;
        for (int i = 0; i < (int)x.size(); ++i) {
            auto found = best.find(x[i]);
            if (found == best.end() || y[i] > found->second)
                best[x[i]] = y[i];
        }
        if (best.size() < 3)
            return -1;
        // The answer is the sum of the three largest per-x maxima.
        int top[3] = {0, 0, 0};
        for (auto &entry : best) {
            int v = entry.second;
            if (v > top[0]) {
                top[2] = top[1];
                top[1] = top[0];
                top[0] = v;
            } else if (v > top[1]) {
                top[2] = top[1];
                top[1] = v;
            } else if (v > top[2]) {
                top[2] = v;
            }
        }
        return top[0] + top[1] + top[2];
    }
};
