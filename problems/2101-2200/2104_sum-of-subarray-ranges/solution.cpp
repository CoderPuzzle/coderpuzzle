class Solution {
  public:
    long long subArrayRanges(vector<int> &nums) {
        int n = nums.size();
        long long total = 0;
        for (int i = 0; i < n; i++) {
            // Extending nums[i..j-1] by nums[j] updates the range in O(1):
            // only the new element can tighten mn or raise mx.
            int mn = nums[i], mx = nums[i];
            // j starts at i+1, skipping length-1 subarrays (range 0).
            for (int j = i + 1; j < n; j++) {
                // else-if is safe: one element can't be both a strict new
                // minimum and a strict new maximum.
                if (nums[j] < mn)
                    mn = nums[j];
                else if (nums[j] > mx)
                    mx = nums[j];
                total += (long long)(mx - mn);
            }
        }
        return total;
    }
};
