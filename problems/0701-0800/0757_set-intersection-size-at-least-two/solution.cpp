class Solution {
  public:
    int intersectionSizeTwo(vector<vector<int>> &intervals) {
        int n = intervals.size();
        vector<pair<int, int>> ivs;
        ivs.reserve(n);
        for (auto &iv : intervals)
            ivs.push_back({iv[0], iv[1]});
        sort(ivs.begin(), ivs.end(), [](const pair<int, int> &a, const pair<int, int> &b) {
            if (a.second != b.second)
                return a.second < b.second;
            return a.first > b.first;
        });
        // Chosen points stay non-decreasing; points inside [s, e] are the
        // trailing run, so checking the last two suffices.
        vector<int> chosen;
        chosen.reserve(2 * n);
        for (auto &[s, e] : ivs) {
            int m = (int)chosen.size();
            if (m >= 2 && chosen[m - 2] >= s)
                continue;
            if (m >= 1 && chosen[m - 1] >= s) {
                chosen.push_back(e);
            } else {
                chosen.push_back(e - 1);
                chosen.push_back(e);
            }
        }
        return (int)chosen.size();
    }
};
