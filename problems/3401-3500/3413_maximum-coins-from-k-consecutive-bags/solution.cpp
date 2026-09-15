class Solution {
  public:
    long long maximumCoins(vector<vector<int>> &coins, int k) {
        vector<vector<int>> segments(coins);
        stable_sort(segments.begin(), segments.end(),
                    [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        int n = (int)segments.size();
        vector<long long> lefts(n), rights(n), cs(n), area(n), prefix(n + 1, 0);
        // Per-segment totals and prefix sums: any run of fully covered
        // segments sums in O(1).
        for (int i = 0; i < n; i++) {
            lefts[i] = segments[i][0];
            rights[i] = segments[i][1];
            cs[i] = segments[i][2];
            area[i] = cs[i] * (rights[i] - lefts[i] + 1);
            prefix[i + 1] = prefix[i] + area[i];
        }

        // An optimal window can always slide until its left end meets some li
        // or its right end meets some ri, so these 2n starts cover the optimum.
        // rights[i] - k + 1 may be negative; positions before 1 simply hold
        // nothing and the binary searches handle them.
        long long best = 0;
        for (int i = 0; i < n; i++) {
            for (long long candidate : {lefts[i], rights[i] - (long long)k + 1}) {
                long long value = window(lefts, rights, cs, area, prefix, (long long)k, candidate);
                if (value > best)
                    best = value;
            }
        }
        return best;
    }

  private:
    long long window(const vector<long long> &lefts, const vector<long long> &rights, const vector<long long> &cs,
                     const vector<long long> &area, const vector<long long> &prefix, long long k, long long start) {
        // Coins inside [start, start + k - 1]. `a` is the first segment whose
        // right end reaches the window; `b` the last whose left end falls
        // inside it.
        long long end = start + k - 1;
        // bisect_left(rights, start)
        int a = (int)(lower_bound(rights.begin(), rights.end(), start) - rights.begin());
        // bisect_right(lefts, end) - 1
        int b = (int)(upper_bound(lefts.begin(), lefts.end(), end) - lefts.begin()) - 1;
        // No segment intersects the window.
        if (a > b)
            return 0;
        // Clip the two boundary segments to the window; the segments in
        // between are fully covered. Segments are disjoint, so clipping
        // both partial ends never double counts.
        long long loA = max(lefts[a], start);
        long long hiA = min(rights[a], end);
        if (a == b) {
            // Window meets only one segment: plain density * clipped length.
            return loA <= hiA ? cs[a] * (hiA - loA + 1) : 0;
        }
        long long loB = max(lefts[b], start);
        long long hiB = min(rights[b], end);
        // Full run from the prefix sum, then swap each boundary segment's
        // full area for its clipped part.
        long long total = prefix[b + 1] - prefix[a];
        total += cs[a] * (hiA - loA + 1) - area[a];
        total += cs[b] * (hiB - loB + 1) - area[b];
        return total;
    }
};
