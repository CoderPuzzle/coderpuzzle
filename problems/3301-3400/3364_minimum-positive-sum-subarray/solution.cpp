class Solution {
  public:
    int minimumSumSubarray(vector<int> &nums, int l, int r) {
        // Prefix sums turn each candidate window into an O(1) subtraction,
        // so scanning every (start, length) pair is O(n^2) windows overall.
        // With n <= 100 and |nums[i]| <= 1000 every partial sum stays far
        // inside 32 bits.
        vector<int> prefix(nums.size() + 1, 0);
        for (int i = 0; i < (int)nums.size(); ++i)
            prefix[i + 1] = prefix[i] + nums[i];
        int best = -1;
        for (int start = 0; start < (int)nums.size(); ++start) {
            for (int length = l; length <= r; ++length) {
                int end = start + length;
                if (end > (int)nums.size())
                    break;
                int total = prefix[end] - prefix[start];
                if (total > 0 && (best == -1 || total < best))
                    best = total;
            }
        }
        return best;
    }
};
