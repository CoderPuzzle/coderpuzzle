class Solution {
  public:
    long long minimumCost(vector<int> &nums, int k, int dist) {
        int n = (int)nums.size();
        int target = k - 2;
        vector<long long> vals(nums.begin(), nums.end());
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        int m = (int)vals.size();

        vector<long long> countBit(m + 1, 0);
        vector<long long> sumBit(m + 1, 0);

        auto fenAdd = [&](vector<long long> &bit, int index, long long delta) {
            int i = index + 1;
            while (i <= m) {
                bit[i] += delta;
                i += i & (-i);
            }
        };
        auto fenPrefix = [&](vector<long long> &bit, int index) -> long long {
            // sum over [0, index]; index may be < 0
            if (index < 0)
                return 0;
            if (index >= m)
                index = m - 1;
            int i = index + 1;
            long long total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & (-i);
            }
            return total;
        };
        // 0-based index of the targetK-th smallest element (targetK >= 1)
        auto kth = [&](int targetK) -> int {
            int idx = 0;
            int bitmask = 1;
            while ((bitmask << 1) <= m)
                bitmask <<= 1;
            long long remaining = targetK;
            while (bitmask > 0) {
                int nxt = idx + bitmask;
                if (nxt <= m && countBit[nxt] < remaining) {
                    idx = nxt;
                    remaining -= countBit[nxt];
                }
                bitmask >>= 1;
            }
            return idx;
        };
        auto sumKSmallest = [&](int count) -> long long {
            if (count == 0)
                return 0;
            int idx = kth(count);
            long long before = fenPrefix(countBit, idx - 1);
            long long sumBefore = fenPrefix(sumBit, idx - 1);
            return sumBefore + (long long)(count - before) * vals[idx];
        };
        auto addValue = [&](int v) {
            int j = (int)(lower_bound(vals.begin(), vals.end(), (long long)v) - vals.begin());
            fenAdd(countBit, j, 1);
            fenAdd(sumBit, j, v);
        };
        auto removeValue = [&](int v) {
            int j = (int)(lower_bound(vals.begin(), vals.end(), (long long)v) - vals.begin());
            fenAdd(countBit, j, -1);
            fenAdd(sumBit, j, -(long long)v);
        };

        long long ans = LLONG_MAX;
        int right0 = min(1 + dist, n - 1);
        for (int p = 2; p <= right0; p++) {
            addValue(nums[p]);
        }

        for (int i1 = 1; i1 < n; i1++) {
            int left = i1 + 1;
            int right = min(i1 + dist, n - 1);
            if (right - left + 1 >= target) {
                long long cost = nums[0] + nums[i1] + sumKSmallest(target);
                if (cost < ans)
                    ans = cost;
            }
            if (left <= n - 1) {
                removeValue(nums[left]);
            }
            int newRight = i1 + 1 + dist;
            if (newRight <= n - 1) {
                addValue(nums[newRight]);
            }
        }
        return ans;
    }
};
