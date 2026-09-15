class Solution {
  public:
    vector<int> searchRange(vector<int> &nums, int target) {
        // The run of targets starts at the first index >= target...
        int start = lowerBound(nums, target);
        if (start == (int)nums.size() || nums[start] != target) {
            return {-1, -1};
        }
        // ...and ends one slot before the first index >= target + 1: the
        // upper bound of target is exactly the lower bound of target + 1.
        return {start, lowerBound(nums, (long long)target + 1) - 1};
    }

  private:
    // Smallest index whose value is >= limit; nums.size() if none. The kept
    // half always contains that boundary, so the window halves until only the
    // boundary is left. The limit is widened because target + 1 can be one
    // past the 32-bit maximum.
    int lowerBound(vector<int> &nums, long long limit) {
        int lo = 0, hi = (int)nums.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < limit) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
};
