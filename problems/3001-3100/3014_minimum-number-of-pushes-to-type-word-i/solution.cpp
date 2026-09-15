class Solution {
  public:
    int minimumPushes(string word) {
        // Distinct letters make frequency irrelevant: dealing them
        // round-robin over the 8 keys costs the p-th letter p / 8 + 1.
        int total = 0;
        for (int position = 0; position < static_cast<int>(word.size()); position++) {
            total += position / 8 + 1;
        }
        return total;
    }
};
