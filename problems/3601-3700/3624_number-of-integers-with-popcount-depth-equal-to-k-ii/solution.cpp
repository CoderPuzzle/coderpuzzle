class Solution {
  public:
    vector<int> popcountDepth(vector<long long> &nums, vector<vector<long long>> &queries) {
        // Every popcount chain collapses to 1 in at most four steps for
        // values <= 10^15, so depths live in 0..4 (k may still ask for 5,
        // whose tree simply stays empty). Six Fenwick trees, one per depth
        // class, each marking the indices currently holding that depth: a
        // query is a prefix-difference on tree[k], an update is two point
        // flips. All loops are iterative, and every count is <= n, so
        // 32-bit answers are safe while values ride in 64-bit.
        int n = nums.size();
        vector<vector<int>> trees(6, vector<int>(n + 1, 0));
        auto depth = [](long long x) {
            int d = 0;
            while (x > 1) {
                x = __builtin_popcountll(x);
                ++d;
            }
            return d;
        };
        auto add = [&](int k, int i, int delta) {
            for (++i; i <= n; i += i & -i)
                trees[k][i] += delta;
        };
        auto pref = [&](int k, int i) {
            int s = 0;
            for (; i > 0; i -= i & -i)
                s += trees[k][i];
            return s;
        };
        for (int i = 0; i < n; ++i)
            add(depth(nums[i]), i, 1);
        vector<int> answer;
        for (auto &q : queries) {
            if (q[0] == 1) {
                int k = (int)q[3];
                answer.push_back(pref(k, (int)q[2] + 1) - pref(k, (int)q[1]));
            } else {
                int idx = (int)q[1];
                add(depth(nums[idx]), idx, -1);
                nums[idx] = q[2];
                add(depth(nums[idx]), idx, 1);
            }
        }
        return answer;
    }
};
