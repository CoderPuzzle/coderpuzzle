class Solution {
  public:
    int minRemoval(vector<int> &nums, int k) {
        // Sort so the best survivor set is a contiguous window: it is
        // balanced exactly when nums[j] <= nums[i] * k at its ends, and the
        // longest such window keeps the most elements.
        sort(nums.begin(), nums.end());
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            // A one-element window is always balanced, so left never passes
            // right. The product reaches 1e14 — beyond 32 bits, so widen
            // before multiplying.
            while ((long long)nums[right] > (long long)nums[left] * k) {
                ++left;
            }
            best = max(best, right - left + 1);
        }
        return (int)nums.size() - best;
    }
};
