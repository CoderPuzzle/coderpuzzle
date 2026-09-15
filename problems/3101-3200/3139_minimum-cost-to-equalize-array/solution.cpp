class Solution {
  public:
    int minCostToEqualizeArray(vector<int> &nums, int cost1, int cost2) {
        // Costs reach about 10**17 -- deficits up to 2*10**11 times prices
        // up to 10**6 -- so every running figure stays in a long long.
        // Each candidate target admits at most min(total/2, total - peak)
        // pair ops, worth taking while cost2 < 2 * cost1; scanning targets
        // up to twice the maximum suffices because further steps only add
        // cost.
        constexpr long long kMod = 1000000007;
        int low = nums[0];
        int high = nums[0];
        for (int v : nums) {
            low = min(low, v);
            high = max(high, v);
        }
        long long total = 0;
        for (int v : nums) {
            total += high - v;
        }
        if (2LL * cost1 <= cost2) {
            return static_cast<int>(total * cost1 % kMod);
        }
        const long long count = nums.size();
        long long best = LLONG_MAX;
        for (long long target = high; target <= 2LL * high; ++target) {
            long long peak = target - low;
            long long pair;
            long long rest;
            if (2LL * peak <= total) {
                pair = total / 2;
                rest = total % 2;
            } else {
                pair = total - peak;
                rest = 2LL * peak - total;
            }
            long long cost = pair * cost2 + rest * cost1;
            if (cost < best) {
                best = cost;
            }
            total += count;
        }
        return static_cast<int>(best % kMod);
    }
};
