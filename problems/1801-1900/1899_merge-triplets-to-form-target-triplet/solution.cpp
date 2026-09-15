class Solution {
  public:
    // Drop overshooters; the survivors' componentwise max is the
    // best-reachable triplet.
    bool mergeTriplets(vector<vector<int>> &triplets, vector<int> &target) {
        int best[3] = {0, 0, 0};
        for (const auto &t : triplets) {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                for (int i = 0; i < 3; i++)
                    best[i] = max(best[i], t[i]);
            }
        }
        return best[0] == target[0] && best[1] == target[1] && best[2] == target[2];
    }
};
