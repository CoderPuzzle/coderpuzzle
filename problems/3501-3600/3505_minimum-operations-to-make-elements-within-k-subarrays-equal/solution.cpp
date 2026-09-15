class Solution {
  public:
    // Equalizing a window costs sum(|v - t|), minimized when t is a median.
    // A sliding window over a Fenwick tree (compressed values) yields every
    // x-window's cost in O(log n): kth finds the median and prefix count/sum
    // split the window about it. A rolling DP then picks k non-overlapping
    // windows.
    long long minOperations(vector<int> &nums, int x, int k) {
        int n = (int)nums.size();
        vector<int> vals = nums;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        int m = (int)vals.size();
        vector<int> cnt(m + 1, 0);
        vector<long long> sm(m + 1, 0);

        int winCount = n - x + 1;
        vector<long long> costs(winCount);
        long long total = 0;
        for (int i = 0; i < n; i++) {
            int idx = (int)(lower_bound(vals.begin(), vals.end(), nums[i]) - vals.begin()) + 1;
            for (int p = idx; p <= m; p += p & -p) {
                cnt[p]++;
                sm[p] += nums[i];
            }
            total += nums[i];
            if (i >= x) {
                int out = (int)(lower_bound(vals.begin(), vals.end(), nums[i - x]) - vals.begin()) + 1;
                for (int p = out; p <= m; p += p & -p) {
                    cnt[p]--;
                    sm[p] -= nums[i - x];
                }
                total -= nums[i - x];
            }
            if (i >= x - 1) {
                int kpos = (x + 1) / 2;
                int pos = 0;
                int acc = 0;
                int step = 1;
                while (step << 1 <= m)
                    step <<= 1;
                for (; step > 0; step >>= 1) {
                    int nxt = pos + step;
                    if (nxt <= m && acc + cnt[nxt] < kpos) {
                        pos = nxt;
                        acc += cnt[nxt];
                    }
                }
                int midIdx = pos + 1;
                int c = 0;
                long long s = 0;
                for (int p = midIdx; p > 0; p -= p & -p) {
                    c += cnt[p];
                    s += sm[p];
                }
                long long med = vals[midIdx - 1];
                costs[i - x + 1] = med * c - s + (total - s) - med * (x - c);
            }
        }

        const long long INF = LLONG_MAX / 4;
        vector<long long> prev(winCount, 0);
        for (int t = 1; t <= k; t++) {
            vector<long long> cur(winCount, INF);
            for (int i = 0; i < winCount; i++) {
                long long best = i > 0 ? cur[i - 1] : INF;
                if (t == 1) {
                    best = min(best, costs[i]);
                } else if (i >= x) {
                    best = min(best, costs[i] + prev[i - x]);
                }
                cur[i] = best;
            }
            prev.swap(cur);
        }
        return prev[winCount - 1];
    }
};
