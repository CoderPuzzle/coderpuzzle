class Solution {
  public:
    int sumOfPower(vector<int> &nums, int k) {
        // A subsequence T with sum k and length j is contained in exactly
        // 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
        // where count[j][s] counts length-j subsequences of sum s — a 0/1
        // knapsack filled with j and s both descending. Elements above k can
        // never join a sum-k subsequence, so they are skipped outright. The
        // weight products reach ~10^18, so the reduction runs in long long.
        const int MOD = 1'000'000'007;
        int n = nums.size();
        vector<vector<int>> counts(n + 1, vector<int>(k + 1, 0));
        counts[0][0] = 1;
        int used = 0;
        for (int num : nums) {
            if (num > k) {
                continue;
            }
            used++;
            for (int j = used; j > 0; j--) {
                for (int s = k; s >= num; s--) {
                    counts[j][s] = (counts[j][s] + counts[j - 1][s - num]) % MOD;
                }
            }
        }
        long long total = 0;
        long long power = 1;
        for (int j = n; j > 0; j--) {
            total = (total + counts[j][k] * power) % MOD;
            power = power * 2 % MOD;
        }
        return static_cast<int>(total);
    }
};
