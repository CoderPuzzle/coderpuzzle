class Solution {
  public:
    long long minimumMoves(vector<int> &nums, int k, int maxChanges) {
        int n = nums.size();
        // 1-indexed positions of ones
        vector<long long> ones(n + 1, 0);
        vector<long long> prefix(n + 1, 0);
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] != 0) {
                m++;
                ones[m] = i;
                prefix[m] = prefix[m - 1] + i;
            }
        }
        const long long INF = numeric_limits<long long>::max() / 4;

        long long lo = max(0LL, (long long)k - maxChanges);
        long long hi = min((long long)k, (long long)m);
        if (lo > hi) {
            return 0;
        }
        while (hi - lo > 4) {
            long long m1 = lo + (hi - lo) / 3;
            long long m2 = hi - (hi - lo) / 3;
            if (total((int)m1, k, ones, prefix, m, INF) <= total((int)m2, k, ones, prefix, m, INF)) {
                hi = m2;
            } else {
                lo = m1;
            }
        }
        long long ans = INF;
        for (long long t = lo; t <= hi; t++) {
            long long v = total((int)t, k, ones, prefix, m, INF);
            if (v < ans) {
                ans = v;
            }
        }
        return ans;
    }

  private:
    long long total(int t, int k, vector<long long> &ones, vector<long long> &prefix, int m, long long INF) {
        long long wc = windowCost(t, ones, prefix, m, INF);
        if (wc == INF) {
            return INF;
        }
        return wc + 2LL * (k - t);
    }

    long long windowCost(int t, vector<long long> &ones, vector<long long> &prefix, int m, long long INF) {
        if (t == 0) {
            return 0;
        }
        if (t > m) {
            return INF;
        }
        long long best = INF;
        for (int l = 1; l <= m - t + 1; l++) {
            int r = l + t - 1;
            int pos = (l + r) / 2;
            long long leftCnt = pos - l;
            long long rightCnt = r - pos;
            long long left = leftCnt * ones[pos] - (prefix[pos - 1] - prefix[l - 1]);
            long long right = (prefix[r] - prefix[pos]) - rightCnt * ones[pos];
            long long cost = left + right;
            if (cost < best) {
                best = cost;
            }
        }
        return best;
    }
};
