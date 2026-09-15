#include <vector>

class Solution {
  public:
    long long minOperations(vector<int> &nums, int k) {
        // A peak's two neighbours (circular) can never themselves be peaks, so
        // they keep their original values and making position i a peak costs
        // max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
        int n = (int)nums.size();
        if (k == 0)
            return 0;
        if (k > n / 2)
            return -1; // a circle admits at most floor(n/2) peaks
        const long long INF = 4000000000000000000LL;
        vector<long long> c(n, 0);
        for (int i = 1; i < n; i++) {
            int prev = i >= 2 ? nums[i - 1] : nums[0];
            int nxt = i <= n - 2 ? nums[i + 1] : nums[0];
            c[i] = max(0LL, max(prev, nxt) + 1LL - nums[i]);
        }
        long long cost0 = max(0LL, max(nums[n - 1], nums[1]) + 1LL - nums[0]);
        long long ansA = cost0 + linear(n, c, max(0, k - 1), true, true);
        long long ansB = linear(n, c, k, false, false);
        long long ans = min(ansA, ansB);
        return ans >= INF ? -1 : ans;
    }

  private:
    // Capped knapsack over positions 1..n-1: notPeak[j]/peak[j] are the cheapest
    // ways to reach j peaks (j == cap means "at least cap") with the current
    // position left unpicked / picked.
    long long linear(int n, vector<long long> &c, int cap, bool forceStart, bool forceEnd) {
        const long long INF = 4000000000000000000LL;
        vector<long long> notPeak(cap + 1, INF);
        vector<long long> peak(cap + 1, INF);
        notPeak[0] = 0;
        if (!forceStart && cap >= 1)
            peak[1] = c[1];
        for (int i = 2; i < n; i++) {
            vector<long long> newNot(cap + 1);
            vector<long long> newPeak(cap + 1, INF);
            for (int j = 0; j <= cap; j++) {
                newNot[j] = min(notPeak[j], peak[j]);
            }
            // A peak needs the previous position unpicked; over cap, extra peaks
            // stay folded into the top cell.
            if (!(i == n - 1 && forceEnd)) {
                long long base = c[i];
                for (int j = 1; j < cap; j++) {
                    long long v = notPeak[j - 1];
                    if (v < INF)
                        newPeak[j] = v + base;
                }
                if (cap >= 1) {
                    long long v = min(notPeak[cap - 1], notPeak[cap]);
                    if (v < INF)
                        newPeak[cap] = v + base;
                }
            }
            notPeak = move(newNot);
            peak = move(newPeak);
        }
        return min(notPeak[cap], peak[cap]);
    }
};
