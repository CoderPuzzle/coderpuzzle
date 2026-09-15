class Solution {
  public:
    int countPairs(vector<vector<int>> &coordinates, int k) {
        unordered_map<long long, int> seen;
        int total = 0;
        for (const auto &point : coordinates) {
            long long key = ((long long)point[0] << 20) | point[1];
            for (int split = 0; split <= k; ++split) {
                long long probe = key ^ (((long long)split << 20) | (k - split));
                auto it = seen.find(probe);
                if (it != seen.end()) {
                    total += it->second;
                }
            }
            ++seen[key];
        }
        return total;
    }
};
