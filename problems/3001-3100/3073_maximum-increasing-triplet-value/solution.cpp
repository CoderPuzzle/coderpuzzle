class Solution {
  public:
    int maximumTripletValue(vector<int> &nums) {
        int n = nums.size();
        // Greatest element strictly to the right of each index.
        vector<int> suffix(n);
        suffix[n - 1] = nums[n - 1];
        for (int k = n - 2; k >= 0; --k) {
            suffix[k] = max(suffix[k + 1], nums[k]);
        }
        // Fenwick tree over compressed ranks, storing prefix maxima of the
        // values inserted so far; query(rank - 1) yields the greatest earlier
        // value strictly smaller than nums[j].
        vector<int> distinct(nums);
        sort(distinct.begin(), distinct.end());
        distinct.erase(unique(distinct.begin(), distinct.end()), distinct.end());
        int size = distinct.size();
        vector<int> tree(size + 1, 0);
        auto rankOf = [&distinct](int value) {
            return int(lower_bound(distinct.begin(), distinct.end(), value) - distinct.begin()) + 1;
        };

        // Every triplet value nums[i] - nums[j] + nums[k] stays within
        // (-10^9, 10^9) because nums[i] < nums[j] < nums[k] <= 10^9.
        int best = INT_MIN;
        auto update = [&](int i, int value) {
            for (; i <= size; i += i & -i) {
                tree[i] = max(tree[i], value);
            }
        };
        auto query = [&](int i) {
            int result = 0;
            for (; i > 0; i -= i & -i) {
                result = max(result, tree[i]);
            }
            return result;
        };

        update(rankOf(nums[0]), nums[0]);
        for (int j = 1; j < n - 1; ++j) {
            int left = query(rankOf(nums[j]) - 1);
            if (left > 0 && nums[j] < suffix[j + 1]) {
                best = max(best, left - nums[j] + suffix[j + 1]);
            }
            update(rankOf(nums[j]), nums[j]);
        }
        return best;
    }
};
