#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maxScore(vector<int> &nums1, vector<int> &nums2, int k) {
        // Bounds: n, m <= 100 and |values| <= 10^6, so each product is at
        // most 10^12 and the k <= 100-term total at most 10^14 — everything
        // lives comfortably in a long long.
        int n = (int)nums1.size();
        int m = (int)nums2.size();
        // dp layer t over prefix lengths (a, b): the best score of exactly
        // t pairs inside nums1[0..a) x nums2[0..b). Layer 0 is identically
        // 0, and layer t only has feasible cells at a >= t, b >= t (fewer
        // than t elements cannot host t pairs); every prev[a-1][b-1] read
        // at such a cell lies inside layer t-1's feasible rectangle, so no
        // sentinel is ever needed.
        vector<vector<long long>> prev(n + 1, vector<long long>(m + 1, 0));
        vector<vector<long long>> cur(n + 1, vector<long long>(m + 1, 0));
        for (int t = 1; t <= k; t++) {
            for (int a = t; a <= n; a++) {
                vector<long long> &row = cur[a];
                vector<long long> &up = cur[a - 1];
                vector<long long> &prow = prev[a - 1];
                long long x = nums1[a - 1];
                for (int b = t; b <= m; b++) {
                    long long best = prow[b - 1] + x * nums2[b - 1];
                    if (a > t && up[b] > best) {
                        best = up[b];
                    }
                    if (b > t && row[b - 1] > best) {
                        best = row[b - 1];
                    }
                    row[b] = best;
                }
            }
            swap(prev, cur);
        }
        return prev[n][m];
    }
};
