class Solution {
  public:
    int minStable(vector<int> &nums, int maxC) {
        int n = (int)nums.size();

        // Sparse table: st[k][i] is the gcd of nums[i .. i+2^k-1]. Two rows
        // tile any query window, so every window gcd is O(1) after the
        // O(n log n) build.
        int LOG = 1;
        while ((1 << LOG) <= n)
            ++LOG;
        vector<vector<int>> st(LOG);
        st[0] = nums;
        for (int k = 1; k < LOG; ++k) {
            int half = 1 << (k - 1);
            int length = n - (1 << k) + 1;
            st[k].resize(length);
            for (int i = 0; i < length; ++i)
                st[k][i] = gcd(st[k - 1][i], st[k - 1][i + half]);
        }

        auto rangeGcd = [&](int left, int right) -> int {
            int len = right - left + 1;
            int k = 31 - __builtin_clz((unsigned)len);
            int span = 1 << k;
            return gcd(st[k][left], st[k][right - span + 1]);
        };

        // Feasibility for a target length k: every window of size k+1 must
        // be broken. Editing one element to 1 breaks every window that
        // contains it, so hitting a window's rightmost element covers the
        // maximal run of later window starts — the classic fixed-length
        // interval point cover, greedily optimal.
        auto feasible = [&](int k) -> bool {
            int width = k + 1;
            if (width > n)
                return true;
            int edits = 0;
            int covered = -1;
            for (int start = 0; start + width <= n; ++start) {
                if (start <= covered)
                    continue;
                if (rangeGcd(start, start + width - 1) > 1) {
                    covered = start + width - 1;
                    ++edits;
                    if (edits > maxC)
                        return false;
                }
            }
            return true;
        };

        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (feasible(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
