class Solution {
  public:
    int maxSubArray(vector<int> &nums) {
        // Kadane's algorithm: current is the best sum of a subarray ending
        // exactly here; the answer is its maximum over all indices.
        // Seeding with nums[0] (not 0) makes all-negative inputs come out
        // right: an empty-prefix 0 must not be allowed to win.
        int best = nums[0];
        int current = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            int value = nums[i];
            // Extend the best subarray ending at i-1, or start fresh: a
            // negative running sum can only drag down what follows.
            current = current < 0 ? value : current + value;
            if (current > best) {
                best = current;
            }
        }
        return best;
    }
};
