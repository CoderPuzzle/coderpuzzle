class Solution {
  public:
    bool canMakeEqual(vector<int> &nums, int k) {
        // Position i is touched only by the flips at i - 1 and at i, so
        // scanning left to right every flip is forced: prev remembers
        // whether the flip at i - 1 fired, and the flip at i must fire
        // exactly when the resulting value misses the target.
        auto canMake = [&](int target) {
            int ops = 0;
            bool prev = false;
            for (int i = 0; i + 1 < (int)nums.size(); ++i) {
                prev = nums[i] * (prev ? -1 : 1) != target;
                ops += prev;
            }
            // The last element has no flip of its own left: the target is
            // only reachable if it already came out right.
            return nums.back() * (prev ? -1 : 1) == target && ops <= k;
        };
        return canMake(1) || canMake(-1);
    }
};
