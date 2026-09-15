class Solution {
  public:
    long long maximumSubarraySum(vector<int> &nums, int k) {
        // counts maps value -> frequency in the current window; zero-count
        // keys are erased so counts.size() is the window's distinct count.
        unordered_map<int, int> counts;
        long long windowSum = 0;
        long long best = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            int value = nums[i];
            counts[value] += 1;
            windowSum += value;
            // Retire nums[i-k] BEFORE evaluating, so exactly k members
            // are in the window at each check.
            if (i >= k) {
                int old = nums[i - k];
                auto it = counts.find(old);
                if (it->second == 1) {
                    counts.erase(it);
                } else {
                    it->second -= 1;
                }
                windowSum -= old;
            }
            // k slots holding k distinct values means no repeats.
            if (i >= k - 1 && (int)counts.size() == k && windowSum > best) {
                best = windowSum;
            }
        }
        return best;
    }
};
