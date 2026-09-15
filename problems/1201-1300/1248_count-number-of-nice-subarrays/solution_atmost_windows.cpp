class Solution {
  public:
    int numberOfSubarrays(vector<int> &nums, int k) {
        // "Exactly k odds" resists a direct window: one odd arrival can
        // break the contract with no symmetric way back. "At most cap odds"
        // repairs any breach from the left, and exactly k is the subtraction
        // of one such budget from a slightly larger one.
        return (int)(atMost(nums, k) - atMost(nums, k - 1));
    }

  private:
    long long atMost(vector<int> &nums, int cap) {
        // Counts subarrays holding at most cap odds: with [left, right]
        // inside the budget and left the smallest such start, every
        // opening from left onward qualifies, so right - left + 1
        // subarrays ending here join the total.
        // Never taken under the statement's k >= 1; it lets the helper
        // answer on its own terms.
        if (cap < 0) {
            return 0;
        }
        int n = nums.size();
        int left = 0;
        int odds = 0;
        long long total = 0;
        for (int right = 0; right < n; right++) {
            odds += nums[right] & 1;
            // An odd broke the budget: retire odds from the left until
            // it holds again. Both ends only ever advance, so the sweep
            // stays linear.
            while (odds > cap) {
                odds -= nums[left] & 1;
                left++;
            }
            total += right - left + 1;
        }
        return total;
    }
};
