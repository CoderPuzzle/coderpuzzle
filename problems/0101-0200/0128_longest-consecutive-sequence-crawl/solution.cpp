class Solution {
  public:
    int longestConsecutive(vector<int> &nums) {
        // A hash set answers "is this value present?" in O(1); iterating the
        // set itself also collapses duplicates before any walking starts.
        unordered_set<int> values(nums.begin(), nums.end());
        int longest = 0;
        for (int value : values) {
            // value - 1 absent means value is where its maximal run begins.
            // Skipping every non-initial member is what keeps the walk linear:
            // without the check, each run would be re-traversed by all of its
            // members and the nested loops would go quadratic.
            if (values.find(value - 1) == values.end()) {
                int length = 0;
                while (values.count(value + length)) {
                    ++length;
                }
                longest = max(longest, length);
            }
        }
        return longest;
    }
};
