class Solution {
  public:
    int maxIncreasingGroups(vector<int> &usageLimits) {
        // Strictly increasing lengths force the optimal sizes to be 1..x —
        // trimming a larger group down keeps every condition valid. Number i
        // may appear at most once per group, so across any chosen m groups
        // it supplies at most min(limits[i], m) elements, while the m largest
        // groups (sizes x-m+1..x) demand m*(2*x-m+1)/2. That supply test must
        // hold for EVERY m <= x (the full total alone lies: [4,4,1,1] sums to
        // exactly what four groups need yet cannot staff a 4-group plus a
        // 3-group), and when all of them hold an assignment exists (bipartite
        // feasibility / integral flow). Sort ascending, sweep g[m] =
        // sum(min(v, m)) with a forward pointer, binary search the largest x.
        vector<int> arr = usageLimits;
        sort(arr.begin(), arr.end());
        int n = arr.size();
        // g[m] <= 10^5 * 10^9 = 10^14 — beyond 32-bit, keep it long long.
        vector<long long> g(n + 1, 0);
        int p = 0;
        for (int m = 1; m <= n; m++) {
            while (p < n && arr[p] < m) {
                p++;
            }
            // n - p is the count of entries >= m; each adds one element.
            g[m] = g[m - 1] + (n - p);
        }
        int lo = 0;
        int hi = n;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (feasible(g, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

  private:
    bool feasible(vector<long long> &g, int x) {
        for (int m = 1; m <= x; m++) {
            if (g[m] < (long long)m * (2 * x - m + 1) / 2) {
                return false;
            }
        }
        return true;
    }
};
