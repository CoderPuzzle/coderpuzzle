class Solution {
  public:
    int xorAfterQueries(vector<int> &nums, vector<vector<int>> &queries) {
        const long long MOD = 1000000007;
        // Fold every query into a scratch copy held in 64-bit cells: walk
        // the indices l, l + k, ... up to r, multiplying each visited
        // element modulo the prime. At most n positions per query keep
        // the total work at n * q.
        vector<long long> values(nums.begin(), nums.end());
        for (const vector<int> &query : queries) {
            int l = query[0], r = query[1], k = query[2];
            long long v = query[3];
            for (int idx = l; idx <= r; idx += k) {
                // The product reaches ~10^14 before the first fold, so
                // the multiply happens in 64 bits even though results
                // fit i32.
                values[idx] = values[idx] * v % MOD;
            }
        }
        // Every element ends below 2^30, so the XOR fits in an int.
        int result = 0;
        for (long long value : values) {
            result ^= static_cast<int>(value);
        }
        return result;
    }
};
