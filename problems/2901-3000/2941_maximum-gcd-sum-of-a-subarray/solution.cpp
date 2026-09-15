class Solution {
  public:
    // For a fixed left end the window gcd only ever decreases as the
    // window grows, and every drop at least halves it, so each left end
    // owns only O(log(max(nums))) distinct gcd values. Keeping one
    // (gcd, furthest right end) entry per value turns the sweep into a
    // merge of two short lists. Prefix sums reach 10^5 * 10^6 = 10^11 and
    // the products reach past the 32-bit range, so the sums, gcds, and
    // products all widen to long long.
    static long long gcd(long long a, long long b) {
        while (b != 0) {
            long long rest = a % b;
            a = b;
            b = rest;
        }
        return a;
    }

    long long maxGcdSum(vector<int> &nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i)
            prefix[i + 1] = prefix[i] + nums[i];
        long long best = 0;
        vector<long long> gs, rs;
        for (int lo = n - 1; lo >= 0; --lo) {
            vector<long long> ng{nums[lo]}, nr{lo};
            for (int t = 0; t < (int)gs.size(); ++t) {
                long long merged = gcd(gs[t], nums[lo]);
                if (merged == ng.back()) {
                    nr.back() = rs[t];
                } else {
                    ng.push_back(merged);
                    nr.push_back(rs[t]);
                }
            }
            gs.swap(ng);
            rs.swap(nr);
            for (int t = 0; t < (int)gs.size(); ++t) {
                if (rs[t] - lo + 1 >= k) {
                    // Positive elements: the longest window with this gcd
                    // has the largest sum.
                    long long candidate = gs[t] * (prefix[rs[t] + 1] - prefix[lo]);
                    if (candidate > best)
                        best = candidate;
                }
            }
        }
        return best;
    }
};
