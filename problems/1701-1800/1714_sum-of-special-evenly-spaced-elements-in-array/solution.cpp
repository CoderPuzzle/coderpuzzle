class Solution {
  public:
    // A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per query
    // when walked directly, which stays cheap only for large y. Split the
    // queries on B ~ sqrt(n): every y <= B gets a residue table pre[y]
    // built right-to-left with pre[y][i] = (nums[i] + pre[y][i+y]) % MOD,
    // making each such query one lookup, while any y > B strides at most
    // n/B ~ B indices. A full suffix sums to 5*10^4 * 10^9 = 5*10^13
    // before the modulus, so accumulation runs in 64 bits and table rows
    // store plain 32-bit mod values.
    vector<int> solve(vector<int> &nums, vector<vector<int>> &queries) {
        const int MOD = 1'000'000'007;
        int n = nums.size();
        int limit = (int)std::sqrt((double)n);
        // pre[y][i] = (nums[i] + pre[y][i + y]) % MOD — the answer of query (i, y)
        vector<vector<int>> pre(limit + 1, vector<int>(n));
        for (int y = 1; y <= limit; ++y) {
            vector<int> &row = pre[y];
            for (int i = n - 1; i >= 0; --i) {
                long long tail = i + y < n ? row[i + y] : 0;
                row[i] = (int)((nums[i] + tail) % MOD);
            }
        }
        vector<int> answer(queries.size());
        for (int q = 0; q < (int)queries.size(); ++q) {
            int x = queries[q][0];
            int y = queries[q][1];
            if (y <= limit) {
                answer[q] = pre[y][x];
            } else {
                long long total = 0;
                for (int j = x; j < n; j += y) {
                    total += nums[j];
                }
                answer[q] = (int)(total % MOD);
            }
        }
        return answer;
    }
};
