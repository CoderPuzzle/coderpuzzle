class Solution {
  public:
    int minimumSize(vector<int> &nums, int maxOperations) {
        // A bag of v must end as ceil(v/penalty) pieces; each division
        // creates exactly one new bag, so it costs ceil(v/penalty) - 1 =
        // (v - 1) / penalty operations — achievable with near-equal splits,
        // all of size <= penalty.
        auto needed = [&](int penalty) {
            long long total = 0;
            for (int balls : nums) {
                total += (balls - 1) / penalty;
            }
            return total;
        };

        // Achievability is monotone in the penalty, so binary search the
        // smallest feasible value; max(nums) needs zero operations.
        int lo = 1;
        int hi = *max_element(nums.begin(), nums.end());
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (needed(mid) <= maxOperations) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
};
