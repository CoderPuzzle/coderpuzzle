class Solution {
  public:
    int countMatchingSubarrays(vector<int> &nums, vector<int> &pattern) {
        int n = (int)nums.size(), m = (int)pattern.size();

        // Reduce every adjacent pair to its relation: rise, fall, or tie.
        vector<int> signs(n - 1);
        for (int i = 0; i + 1 < n; ++i) {
            signs[i] = (nums[i + 1] > nums[i]) - (nums[i + 1] < nums[i]);
        }

        // A size m+1 subarray matches iff its m relations equal the pattern.
        int count = 0;
        for (int start = 0; start + m < n; ++start) {
            bool match = true;
            for (int k = 0; k < m && match; ++k) {
                match = signs[start + k] == pattern[k];
            }
            if (match) {
                ++count;
            }
        }
        return count;
    }
};
