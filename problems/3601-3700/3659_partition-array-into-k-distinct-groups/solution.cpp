class Solution {
  public:
    bool partitionArray(vector<int> &nums, int k) {
        // Whole groups of exactly k require n to divide evenly, and each
        // occurrence of a value consumes a group of its own, so no value may
        // occur more often than the number of groups.
        int n = static_cast<int>(nums.size());
        if (n % k != 0) {
            return false;
        }
        unordered_map<int, int> count;
        int mostFrequent = 0;
        for (int value : nums) {
            mostFrequent = max(mostFrequent, ++count[value]);
        }
        return mostFrequent <= n / k;
    }
};
