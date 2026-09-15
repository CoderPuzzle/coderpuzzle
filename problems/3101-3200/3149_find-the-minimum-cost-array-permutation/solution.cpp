class Solution {
  public:
    vector<int> findPermutation(vector<int> &nums) {
        int n = nums.size();
        int full = (1 << n) - 1;
        const long long INF = numeric_limits<long long>::max() / 4;

        // f[mask][last] = min additional cost to visit all elements not in
        // mask, starting from `last`, including the closing edge to nums[0]
        vector<vector<long long>> f(1 << n, vector<long long>(n, INF));
        for (int last = 0; last < n; last++) {
            f[full][last] = abs(last - nums[0]);
        }
        for (int mask = full - 1; mask >= 1; mask--) {
            for (int last = 0; last < n; last++) {
                if (!((mask >> last) & 1)) {
                    continue;
                }
                long long best = INF;
                for (int nxt = 0; nxt < n; nxt++) {
                    if ((mask >> nxt) & 1) {
                        continue;
                    }
                    long long cost = (long long)abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt];
                    if (cost < best) {
                        best = cost;
                    }
                }
                f[mask][last] = best;
            }
        }

        // greedy reconstruction: smallest next element keeping the cost optimal
        vector<int> perm;
        perm.push_back(0);
        int mask = 1;
        int last = 0;
        for (int step = 1; step < n; step++) {
            for (int nxt = 0; nxt < n; nxt++) {
                if ((mask >> nxt) & 1) {
                    continue;
                }
                if ((long long)abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt] == f[mask][last]) {
                    perm.push_back(nxt);
                    mask |= 1 << nxt;
                    last = nxt;
                    break;
                }
            }
        }
        return perm;
    }
};
