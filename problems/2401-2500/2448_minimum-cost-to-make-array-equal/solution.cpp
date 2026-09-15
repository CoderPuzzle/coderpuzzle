class Solution {
  public:
    long long minCost(vector<int> &nums, vector<int> &cost) {
        int n = nums.size();
        vector<pair<long long, long long>> pairs(n);
        for (int i = 0; i < n; i++) {
            pairs[i] = {(long long)nums[i], (long long)cost[i]};
        }
        sort(pairs.begin(), pairs.end());
        // The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
        // its slope flips where cumulative cost crosses half the total, so
        // the optimum is the weighted median.
        long long total = 0;
        for (auto &p : pairs)
            total += p.second;
        long long target = (total + 1) / 2;
        long long prefix = 0;
        long long median = pairs[n - 1].first;
        // Walk sorted values until the prefix weight reaches ceil(total/2);
        // >= with the +1 picks the lower median on an even split (same cost).
        for (auto &p : pairs) {
            prefix += p.second;
            if (prefix >= target) {
                median = p.first;
                break;
            }
        }
        // Evaluate the convex cost at the median; it lies at a breakpoint
        // (an existing value), so restricting to nums values loses nothing.
        long long ans = 0;
        for (auto &p : pairs) {
            ans += llabs(p.first - median) * p.second;
        }
        return ans;
    }
};
