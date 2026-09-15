class Solution {
  public:
    bool checkEqualPartitions(vector<int> &nums, long long target) {
        // Enumerate every proper subset as one side; the mask's complement
        // is the other side. Products stop early once they exceed target,
        // so intermediates stay below target * 100 <= 1e17 — far inside
        // the long long range.
        int n = static_cast<int>(nums.size());
        int full = (1 << n) - 1;
        for (int x : nums) {
            if (target % x != 0) {
                return false; // every element sits in a side, so each divides target
            }
        }
        auto productWithin = [&](int mask) -> long long {
            long long product = 1;
            for (int i = 0; i < n; ++i) {
                if (mask >> i & 1) {
                    product *= nums[i];
                    if (product > target) {
                        return -1LL;
                    }
                }
            }
            return product;
        };
        for (int mask = 1; mask < full; ++mask) {
            if (productWithin(mask) == target && productWithin(mask ^ full) == target) {
                return true;
            }
        }
        return false;
    }
};
