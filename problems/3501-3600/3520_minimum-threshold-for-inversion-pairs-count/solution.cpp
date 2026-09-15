class Solution {
  public:
    // count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j] <=
    // x} is non-decreasing in x, so binary search the smallest x with
    // count(x) >= k. Each count sweeps left to right with a Fenwick tree
    // over the compressed values, adding for every j the number of earlier
    // elements whose value falls in the window (nums[j], nums[j] + x].
    // n <= 1e4 bounds the pair count by n*(n-1)/2 < 5e7, well inside int.
    int minThreshold(vector<int> &nums, int k) {
        vector<int> vals = nums;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        int m = vals.size();
        long long maxDiff = (long long)vals[m - 1] - vals[0];

        auto count = [&](long long x) -> long long {
            vector<int> tree(m + 1, 0);
            long long total = 0;
            for (int v : nums) {
                int c = lower_bound(vals.begin(), vals.end(), v) - vals.begin();
                // earlier elements with value in (v, v + x]
                int hi = upper_bound(vals.begin(), vals.end(), v + x) - vals.begin();
                for (int i = hi; i > 0; i -= i & -i)
                    total += tree[i];
                // c is the 0-based compressed index; its Fenwick position
                // is c + 1, so the prefix cut and the insert both start there.
                for (int i = c + 1; i > 0; i -= i & -i)
                    total -= tree[i];
                for (int i = c + 1; i <= m; i += i & -i)
                    tree[i]++;
            }
            return total;
        };

        if (maxDiff == 0 || count(maxDiff) < k)
            return -1;
        long long lo = 1, hi = maxDiff;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (count(mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
};
