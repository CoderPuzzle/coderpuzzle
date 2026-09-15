class Solution {
  public:
    // Fix the middle index m and count (left pair, right pair) combos where
    // x = nums[m] is the unique mode. With a+b >= 2 side copies of x its
    // frequency 1+a+b is untouchable; with exactly one side copy the 3
    // non-x picks must be pairwise distinct. Per-middle terms stay below
    // ~4 * 10^12, so they are accumulated in a long long and reduced
    // modulo 10^9 + 7 each middle.
    int subsequencesWithMiddleMode(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        int n = nums.size();
        unordered_map<int, int> ids;
        vector<int> comp(n);
        for (int i = 0; i < n; ++i) {
            auto found = ids.find(nums[i]);
            if (found == ids.end())
                found = ids.emplace(nums[i], (int)ids.size()).first;
            comp[i] = found->second;
        }
        int d = (int)ids.size();
        vector<long long> cntL(d, 0), cntR(d, 0);
        long long SL = 0, SR = 0;
        for (int i = 1; i < n; ++i) {
            SR += cntR[comp[i]];
            cntR[comp[i]] += 1;
        }
        long long ans = 0;
        for (int m = 0; m < n; ++m) {
            int x = comp[m];
            if (m > 0) {
                // advance: nums[m-1] joins the left, nums[m] leaves the right
                int y = comp[m - 1];
                SL += cntL[y];
                cntL[y] += 1;
                SR -= cntR[x] - 1;
                cntR[x] -= 1;
            }
            long long l = cntL[x], r = cntR[x];
            long long ml = m - l, mr = n - 1 - m - r;
            long long cl = c2(l), cr = c2(r);
            // pair sums over non-x values only: x contributes cl / cr itself
            long long SxL = SL - cl, SxR = SR - cr;
            // exactly one side copy of x: the right pair avoids the left
            // pick's value (T_R), or mirrored (T_L)
            long long TR = 0;
            for (int u = 0; u < d; ++u) {
                long long lu = cntL[u];
                if (lu > 0 && u != x) {
                    long long cR = cntR[u];
                    TR += lu * (c2(mr - cR) - SxR + c2(cR));
                }
            }
            long long TL = 0;
            for (int u = 0; u < d; ++u) {
                long long ru = cntR[u];
                if (ru > 0 && u != x) {
                    long long cL = cntL[u];
                    TL += ru * (c2(ml - cL) - SxL + c2(cL));
                }
            }
            long long total =
                cl * c2(mr) + cl * r * mr + cl * cr + l * ml * r * mr + l * ml * cr + c2(ml) * cr + l * TR + r * TL;
            ans = (ans + total) % MOD;
        }
        return (int)ans;
    }

  private:
    static long long c2(long long t) { return t * (t - 1) / 2; }
};
