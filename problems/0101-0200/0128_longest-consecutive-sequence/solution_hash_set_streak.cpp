class Solution {
  public:
    int longestConsecutive(vector<int> &nums) {
        // The set collapses duplicates and makes membership an O(1) test.
        unordered_set<long long> values(nums.begin(), nums.end());
        int best = 0;
        for (long long value : values) {
            // Only a true run start (no value - 1 present) triggers a walk;
            // each maximal run has exactly one such start, which keeps the
            // nested loop linear: every element is touched at most twice.
            if (values.find(value - 1) == values.end()) {
                int length = 1;
                // Walk upward through the run without sorting anything.
                while (values.find(value + length) != values.end()) {
                    length++;
                }
                best = max(best, length);
            }
        }
        return best;
    }
};
