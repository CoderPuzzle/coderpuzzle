class Solution {
  public:
    int minZeroArray(vector<int> &nums, vector<vector<int>> &queries) {
        // After the first k queries an index can reach zero exactly when
        // the total val of the queries covering it is at least nums[i] —
        // each index can spend every covering query's allowance
        // independently, and extra queries never hurt, so feasibility is
        // monotone in k. Binary search k; each probe folds the first k
        // queries into a difference array and checks one prefix sweep,
        // O(n + q). Coverage sums are bounded by q * val <= 5 * 10^5, well
        // inside int.
        int n = nums.size();
        int lo = 0;
        int hi = queries.size();
        if (!feasible(nums, queries, hi)) {
            return -1;
        }
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (feasible(nums, queries, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    bool feasible(vector<int> &nums, vector<vector<int>> &queries, int k) {
        int n = nums.size();
        vector<int> delta(n + 1, 0);
        for (int j = 0; j < k; j++) {
            delta[queries[j][0]] += queries[j][2];
            delta[queries[j][1] + 1] -= queries[j][2];
        }
        int cover = 0;
        for (int i = 0; i < n; i++) {
            cover += delta[i];
            if (cover < nums[i]) {
                return false;
            }
        }
        return true;
    }
};
