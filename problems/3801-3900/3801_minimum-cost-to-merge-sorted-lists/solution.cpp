#include <algorithm>
#include <vector>

class Solution {
  public:
    long long minMergeCost(vector<vector<int>> &lists) {
        int n = (int)lists.size();
        int size = 1 << n;

        // Total length of every mask, built up from its lowest set bit.
        vector<long long> totalLen(size, 0);
        for (int mask = 1; mask < size; mask++) {
            int low = mask & -mask;
            int idx = __builtin_ctz((unsigned)low);
            totalLen[mask] = totalLen[mask ^ low] + (long long)lists[idx].size();
        }

        // Left-middle median of every mask, found without materializing the
        // merged list: binary search the sorted value pool for the smallest
        // value with more than half the mask's elements at or below it.
        vector<int> vals;
        for (const auto &one : lists) {
            vals.insert(vals.end(), one.begin(), one.end());
        }
        sort(vals.begin(), vals.end());
        vector<long long> med(size, 0);
        for (int mask = 1; mask < size; mask++) {
            int rank = (int)((totalLen[mask] - 1) / 2);
            int lo = 0;
            int hi = (int)vals.size() - 1;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                int cnt = 0;
                for (int i = 0; i < n; i++) {
                    if (mask >> i & 1) {
                        cnt += (int)(upper_bound(lists[i].begin(), lists[i].end(), vals[mid]) - lists[i].begin());
                    }
                }
                if (cnt > rank) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            med[mask] = vals[lo];
        }

        // dp over subsets: the last merge of a mask always pays the mask's
        // total length plus the gap between the two merged-in medians, so
        // only the split itself is a free choice.
        const long long INF = 1LL << 60;
        vector<long long> dp(size, INF);
        for (int mask = 1; mask < size; mask++) {
            if (!(mask & (mask - 1))) {
                dp[mask] = 0;
                continue;
            }
            long long best = INF;
            for (int sub = (mask - 1) & mask; sub; sub = (sub - 1) & mask) {
                int other = mask ^ sub;
                if (sub < other) {
                    // each unordered split exactly once
                    long long cost = dp[sub] + dp[other] + totalLen[mask] + llabs(med[sub] - med[other]);
                    if (cost < best) {
                        best = cost;
                    }
                }
            }
            dp[mask] = best;
        }
        return dp[size - 1];
    }
};
