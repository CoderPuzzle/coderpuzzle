class Solution {
  public:
    int smallestDivisor(vector<int> &nums, int threshold) {
        int hi = *max_element(nums.begin(), nums.end());
        // The ceiled sum is non-increasing in the divisor, so "sum <=
        // threshold" is monotone: lower-bound search for the smallest valid d.
        // Past max(nums) every term is already 1, capping the range.
        int lo = 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (total(nums, mid) <= (long long)threshold)
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }

  private:
    // (x + d - 1) / d is the float-free ceiling of x / d.
    long long total(vector<int> &nums, int divisor) {
        long long sum = 0;
        for (int x : nums) {
            sum += (x + divisor - 1LL) / divisor;
        }
        return sum;
    }
};
