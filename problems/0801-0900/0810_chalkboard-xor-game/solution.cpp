class Solution {
  public:
    bool xorGame(vector<int> &nums) {
        // Alice wins exactly when the board already folds to 0 (she wins
        // on the spot) or the count is even, letting her always hand Bob
        // a nonzero odd board he cannot escape.
        int total = 0;
        for (int value : nums) {
            total ^= value;
        }
        return total == 0 || nums.size() % 2 == 0;
    }
};
