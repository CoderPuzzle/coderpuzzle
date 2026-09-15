class Solution {
  public:
    int rangeSum(vector<int> &nums, int n, int left, int right) {
        const long long MOD = 1'000'000'007LL;
        // Every subarray sum, generated with a running total per start index
        // so each end index adds O(1) work instead of re-summing nums[i..j].
        vector<int> sums;
        sums.reserve((size_t)n * (n + 1) / 2);
        for (int i = 0; i < n; ++i) {
            int running = 0;
            for (int j = i; j < n; ++j) {
                running += nums[j];
                sums.push_back(running);
            }
        }
        sort(sums.begin(), sums.end());
        // 1-indexed [left, right] window, accumulated in a 64-bit total and
        // reduced modulo 1e9 + 7 — the raw sum can exceed a 32-bit
        // accumulator even though no single subarray sum does.
        long long answer = 0;
        for (int k = left - 1; k < right; ++k) {
            answer = (answer + sums[k]) % MOD;
        }
        return (int)answer;
    }
};
