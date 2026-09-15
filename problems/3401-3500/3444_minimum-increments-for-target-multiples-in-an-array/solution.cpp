class Solution {
  public:
    // An optimal plan serves each group of targets with a single element
    // (a multiple of the group's lcm), so it uses at most m elements in
    // total, and an exchange argument keeps every group's element among
    // the m cheapest servants of that group — the dp below only sweeps
    // those few candidates. Subsets whose lcm exceeds CAP are skipped:
    // serving such a subset with one element costs more than serving its
    // targets separately ever can, and the lcm fold stays below 10^9.
    int minimumIncrements(vector<int> &nums, vector<int> &target) {
        int n = (int)nums.size();
        int m = (int)target.size();
        int full = (1 << m) - 1;
        const long long CAP = 100000;
        const long long INF = 1e15;
        vector<long long> lcms(full + 1, 1);
        for (int mask = 1; mask <= full; mask++) {
            int low = mask & -mask;
            long long l = lcms[mask ^ low];
            int t = target[__builtin_ctz(low)];
            l = l / gcd(l, t) * t;
            lcms[mask] = l <= CAP ? l : 0;
        }
        vector<char> cand(n, 0);
        vector<long long> bestCost(m, INF);
        vector<int> bestIdx(m, -1);
        for (int sub = 1; sub <= full; sub++) {
            long long l = lcms[sub];
            if (l == 0) {
                continue;
            }
            fill(bestCost.begin(), bestCost.end(), INF);
            fill(bestIdx.begin(), bestIdx.end(), -1);
            for (int i = 0; i < n; i++) {
                long long cost = (l - nums[i] % l) % l;
                if (cost >= bestCost[m - 1]) {
                    continue;
                }
                int r = m - 1;
                while (r > 0 && bestCost[r - 1] > cost) {
                    bestCost[r] = bestCost[r - 1];
                    bestIdx[r] = bestIdx[r - 1];
                    r--;
                }
                bestCost[r] = cost;
                bestIdx[r] = i;
            }
            for (int idx : bestIdx) {
                if (idx >= 0) {
                    cand[idx] = 1;
                }
            }
        }
        vector<long long> dp(full + 1, INF), ndp(full + 1);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (!cand[i]) {
                continue;
            }
            int x = nums[i];
            ndp = dp;
            for (int mask = 0; mask <= full; mask++) {
                long long base = dp[mask];
                if (base >= INF) {
                    continue;
                }
                int comp = full ^ mask;
                for (int sub = comp; sub; sub = (sub - 1) & comp) {
                    long long l = lcms[sub];
                    if (l == 0) {
                        continue;
                    }
                    long long cand2 = base + (l - x % l) % l;
                    if (cand2 < ndp[mask | sub]) {
                        ndp[mask | sub] = cand2;
                    }
                }
            }
            swap(dp, ndp);
        }
        return (int)dp[full];
    }

  private:
    long long gcd(long long a, long long b) {
        while (b != 0) {
            long long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
