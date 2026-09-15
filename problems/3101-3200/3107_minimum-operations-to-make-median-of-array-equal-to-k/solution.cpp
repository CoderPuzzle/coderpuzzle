class Solution {
  public:
    long long minOperationsToMakeMedianK(vector<int> &nums, int k) {
        // After sorting, the median slot is n / 2: the middle element for
        // odd n and the larger of the two middles for even n, matching the
        // statement's definition. Elements left of the slot above k must
        // come down to k; elements right of it below k must come up. The
        // total reaches ~2*10**14 at the constraint maximum, so the count
        // lives in a long long.
        sort(nums.begin(), nums.end());
        int mid = static_cast<int>(nums.size()) / 2;
        long long total = abs(static_cast<long long>(nums[mid]) - k);
        for (int i = 0; i < mid; i++) {
            if (nums[i] > k) {
                total += nums[i] - k;
            }
        }
        for (size_t i = mid + 1; i < nums.size(); i++) {
            if (nums[i] < k) {
                total += static_cast<long long>(k) - nums[i];
            }
        }
        return total;
    }
};
