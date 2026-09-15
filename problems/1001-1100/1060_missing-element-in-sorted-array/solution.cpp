class Solution {
  public:
    int missingElement(vector<int> &nums, int k) {
        int n = nums.size();
        // A gapless array would have nums[i] = nums[0] + i, so missing(i)
        // counts the values absent before nums[i]; it is non-decreasing.
        auto missing = [&](int i) { return nums[i] - nums[0] - i; };
        // Whole array holds fewer than k missing numbers: answer lies beyond
        // the last element.
        if (missing(n - 1) < k) {
            return nums[n - 1] + (k - missing(n - 1));
        }
        // First index whose missing count reaches k; missing(0) = 0 < k keeps
        // lo >= 1, so lo - 1 is always valid.
        int lo = 0, hi = n - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (missing(mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The kth missing number sits in the gap right after nums[lo-1].
        return nums[lo - 1] + (k - missing(lo - 1));
    }
};
