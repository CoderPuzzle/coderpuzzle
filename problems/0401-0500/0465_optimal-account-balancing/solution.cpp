class Solution {
  public:
    int minTransfers(vector<vector<int>> &transactions) {
        unordered_map<int, long long> balance;
        for (const auto &t : transactions) {
            balance[t[0]] -= t[2];
            balance[t[1]] += t[2];
        }
        vector<long long> debts;
        for (const auto &kv : balance) {
            if (kv.second != 0)
                debts.push_back(kv.second);
        }
        // Only nonzero net balances matter: any zero-sum group of s people
        // settles in s-1 transfers, so maximizing the group count g of a
        // partition minimizes the total n - g.
        int n = (int)debts.size();
        if (n == 0)
            return 0;

        int total = 1 << n;
        // Subset sums built incrementally via the lowest set bit; valid
        // marks zero-sum subsets, the candidate groups.
        vector<long long> sums(total, 0);
        vector<bool> valid(total, false);
        for (int mask = 1; mask < total; mask++) {
            int lsb = mask & -mask;
            int bit = __builtin_ctz(lsb);
            sums[mask] = sums[mask ^ lsb] + debts[bit];
            valid[mask] = (sums[mask] == 0);
        }

        // dp[mask] = most disjoint valid groups partitioning mask; NEG means
        // "not exactly partitionable", so only full covers add.
        const int NEG = -1000000000;
        vector<int> dp(total, NEG);
        dp[0] = 0;
        for (int mask = 1; mask < total; mask++) {
            int sub = mask;
            while (sub) {
                if (valid[sub] && dp[mask ^ sub] != NEG) {
                    dp[mask] = max(dp[mask], dp[mask ^ sub] + 1);
                }
                sub = (sub - 1) & mask;
            }
        }
        // Fewest transactions = n balances minus the best group count.
        return n - dp[total - 1];
    }
};
