class Solution {
  public:
    int longestSubarray(vector<int> &nums, int k) {
        // freq counts occurrences of each value inside the window; dup counts
        // how many values have been seen twice or more.
        unordered_map<int, int> freq;
        int dup = 0, left = 0, best = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            if (++freq[nums[right]] == 2) {
                dup++;
            }
            // Grow past k repeating values and the window must give ground
            // until one of them is fully evicted again.
            while (dup > k) {
                if (--freq[nums[left]] == 1) {
                    dup--;
                }
                left++;
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
