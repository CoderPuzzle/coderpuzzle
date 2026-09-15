class Solution {
  public:
    // Stream queries once; per index keep subset-sum reachability of the
    // vals seen so far (0/1 knapsack, one item per query) as a boolean
    // table, and stop updating an index once its target is reachable.
    int minZeroArray(vector<int> &nums, vector<vector<int>> &queries) {
        int n = nums.size();
        vector<vector<char>> reach(n);
        vector<char> done(n, 0);
        int remaining = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                done[i] = 1;
            } else {
                reach[i].assign(nums[i] + 1, 0);
                reach[i][0] = 1;
                remaining++;
            }
        }
        if (remaining == 0) {
            return 0;
        }
        for (int k = 0; k < (int)queries.size(); k++) {
            int l = queries[k][0], r = queries[k][1], val = queries[k][2];
            for (int i = l; i <= r; i++) {
                if (done[i] || val > nums[i]) {
                    continue;
                }
                vector<char> &row = reach[i];
                for (int s = nums[i] - val; s >= 0; s--) {
                    if (row[s]) {
                        row[s + val] = 1;
                    }
                }
                if (row[nums[i]]) {
                    done[i] = 1;
                    remaining--;
                }
            }
            if (remaining == 0) {
                return k + 1;
            }
        }
        return -1;
    }
};
