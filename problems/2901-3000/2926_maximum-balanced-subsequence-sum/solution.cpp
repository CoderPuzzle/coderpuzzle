class Solution {
  public:
    long long maxBalancedSubsequenceSum(vector<int> &nums) {
        // Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence
        // is balanced precisely when b[i] = nums[i] - i is non-decreasing
        // along it. Compress b into ranks to key the Fenwick tree.
        int n = (int)nums.size();
        vector<long long> vals(n);
        for (int i = 0; i < n; i++) {
            vals[i] = (long long)nums[i] - i;
        }
        vector<long long> comp = vals;
        sort(comp.begin(), comp.end());
        comp.erase(unique(comp.begin(), comp.end()), comp.end());
        int m = (int)comp.size();
        // Max-flavored Fenwick tree (update propagates dp values upward,
        // query takes the best dp among ranks <= i), initialized to zero —
        // which implements the max(0, ...) cutoff: a single element is
        // always a balanced subsequence, so negative predecessors are
        // ignored and each element may start fresh.
        vector<long long> bit(m + 1, 0);

        long long ans = LLONG_MIN;
        for (int i = 0; i < n; i++) {
            // dp[i] = nums[i] + best predecessor dp with rank <= j. Ties are
            // fine since equal b values satisfy the rearranged inequality,
            // so the query includes i's own rank.
            int j = (int)(lower_bound(comp.begin(), comp.end(), vals[i]) - comp.begin()) + 1;
            long long best = query(bit, j);
            long long dp = (best <= 0) ? (long long)nums[i] : (long long)nums[i] + best;
            if (dp > ans) {
                ans = dp;
            }
            update(bit, j, dp);
        }
        return ans;
    }

  private:
    void update(vector<long long> &bit, int i, long long value) {
        int m = (int)bit.size() - 1;
        while (i <= m) {
            if (value > bit[i]) {
                bit[i] = value;
            }
            i += i & (-i);
        }
    }

    long long query(vector<long long> &bit, int i) {
        long long best = 0;
        while (i > 0) {
            if (bit[i] > best) {
                best = bit[i];
            }
            i -= i & (-i);
        }
        return best;
    }
};
