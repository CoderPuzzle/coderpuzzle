class Solution {
  public:
    vector<int> concatenatedDivisibility(vector<int> &nums, int k) {
        int n = nums.size();
        vector<int> lens(n);
        for (int i = 0; i < n; i++) {
            int x = nums[i], len = 0;
            while (x) {
                len++;
                x /= 10;
            }
            lens[i] = len;
        }
        long long pow10[8];
        pow10[0] = 1;
        for (int i = 1; i < 8; i++)
            pow10[i] = pow10[i - 1] * 10;

        int full = (1 << n) - 1;
        // dp[mask][rem]: after using `mask` with prefix remainder rem, can the
        // unused numbers finish the concatenation divisible by k?
        vector<vector<char>> dp(1 << n, vector<char>(k, 0));
        // anchor: everything used and remainder 0 is already a valid finish
        dp[full][0] = 1;
        // fill masks in decreasing order so transitions read more-used masks
        for (int mask = full - 1; mask >= 0; mask--) {
            for (int rem = 0; rem < k; rem++) {
                for (int i = 0; i < n; i++) {
                    if (!((mask >> i) & 1)) {
                        // appending nums[i] shifts rem to (rem*10^len + x) mod k
                        int nrem = (int)(((long long)rem * pow10[lens[i]] + nums[i]) % k);
                        if (dp[mask | (1 << i)][nrem]) {
                            dp[mask][rem] = 1;
                            break;
                        }
                    }
                }
            }
        }

        vector<int> res;
        if (!dp[0][0])
            return res;

        // reconstruction: greedily take the smallest unused number that keeps
        // the state completable — safe because the DP marks exactly those
        vector<int> order(n);
        for (int i = 0; i < n; i++)
            order[i] = i;
        stable_sort(order.begin(), order.end(), [&](int a, int b) { return nums[a] < nums[b]; });

        int mask = 0;
        long long rem = 0;
        for (int step = 0; step < n; step++) {
            for (int i : order) {
                if (!((mask >> i) & 1)) {
                    long long nrem = (rem * pow10[lens[i]] + nums[i]) % k;
                    if (dp[mask | (1 << i)][(int)nrem]) {
                        res.push_back(nums[i]);
                        mask |= 1 << i;
                        rem = nrem;
                        break;
                    }
                }
            }
        }
        return res;
    }
};
