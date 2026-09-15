class Solution {
  public:
    long long maximumTotalDamage(vector<int> &power) {
        // Copies of equal damage act as one all-or-nothing group worth
        // count * v (casting any copy already bans the rest of that
        // value). Sort unique damages ascending and run a forward
        // take/skip DP where taking v requires predecessors <= v - 3,
        // tracked by a monotone left pointer. Totals reach 10^14 at the
        // bounds, far beyond an int, so run the gains in 64-bit.
        unordered_map<int, long long> totals;
        for (int value : power) {
            totals[value] += value;
        }
        vector<pair<int, long long>> groups(totals.begin(), totals.end());
        sort(groups.begin(), groups.end());
        int m = static_cast<int>(groups.size());
        vector<long long> best(m, 0);
        int left = 0;
        for (int j = 0; j < m; ++j) {
            long long v = groups[j].first;
            while (static_cast<long long>(groups[left].first) <= v - 3) {
                ++left;
            }
            long long take = groups[j].second + (left > 0 ? best[left - 1] : 0LL);
            long long skip = j > 0 ? best[j - 1] : 0LL;
            best[j] = max(skip, take);
        }
        return best[m - 1];
    }
};
