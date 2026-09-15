#include <vector>

class Solution {
  public:
    int countPartitions(std::vector<int> &nums, int k) {
        // Reverse view per the hint: a partition fails when either group's
        // sum lands under k, and both failures coincide only if the total
        // is under 2*k -- then zero great partitions exist outright.
        // Otherwise every subset with sum < k names one failure per side,
        // so the answer is 2^n minus twice their count.
        const long long MOD = 1000000007LL;
        long long total = 0;
        for (int value : nums)
            total += value;
        if (total < 2LL * k)
            return 0;
        // ways[s] holds, mod p, how many subsets of the processed prefix
        // sum to s; rows at k and beyond can never come back below k.
        std::vector<long long> ways(k, 0);
        ways[0] = 1;
        for (int value : nums) {
            for (int s = k - 1; s >= value; --s)
                ways[s] = (ways[s] + ways[s - value]) % MOD;
        }
        // Fewer than 1000 rows below the modulus: summing them is safe.
        long long below = 0;
        for (long long count : ways)
            below += count;
        below %= MOD;
        long long power = 1;
        for (int i = 0; i < (int)nums.size(); ++i)
            power = power * 2 % MOD;
        return (int)((power - 2 * below % MOD + MOD) % MOD);
    }
};
