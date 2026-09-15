class Solution {
  public:
    long long maxAlternatingSum(vector<int> &nums, vector<vector<int>> &swaps) {
        // A pair lets its two indices trade values any number of times, so
        // each connected component of the swap graph rearranges freely:
        // merge the pair's endpoints with a union-find.
        int n = nums.size();
        vector<int> parent(n), sz(n, 1);
        iota(parent.begin(), parent.end(), 0);
        auto find = [](vector<int> &parent, int x) {
            // Two-pass path compression keeps every later find near O(1).
            int root = x;
            while (parent[root] != root) {
                root = parent[root];
            }
            while (parent[x] != root) {
                int up = parent[x];
                parent[x] = root;
                x = up;
            }
            return root;
        };
        for (const vector<int> &pair : swaps) {
            int rp = find(parent, pair[0]);
            int rq = find(parent, pair[1]);
            if (rp == rq) {
                continue;
            }
            if (sz[rp] < sz[rq]) {
                swap(rp, rq);
            }
            parent[rq] = rp;
            sz[rp] += sz[rq];
        }

        // Collect each component's values and count its even-index slots.
        vector<vector<long long>> vals(n);
        vector<int> evens(n, 0);
        for (int i = 0; i < n; ++i) {
            int r = find(parent, i);
            vals[r].push_back(nums[i]);
            if (i % 2 == 0) {
                evens[r]++;
            }
        }

        // With E even slots in a component, placing its E largest values on
        // them contributes 2*sumTopE - sumAll; totals reach ~1e14, hence
        // long long throughout.
        long long ans = 0;
        for (int r = 0; r < n; ++r) {
            if (vals[r].empty()) {
                continue;
            }
            sort(vals[r].begin(), vals[r].end());
            int m = vals[r].size();
            long long topE = 0, all = 0;
            for (int j = 0; j < m; ++j) {
                all += vals[r][j];
                if (j >= m - evens[r]) {
                    topE += vals[r][j];
                }
            }
            ans += 2 * topE - all;
        }
        return ans;
    }
};
