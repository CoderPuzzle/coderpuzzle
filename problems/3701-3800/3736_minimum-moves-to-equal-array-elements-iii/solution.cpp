class Solution {
  public:
    int minMoves(vector<int> &nums) {
        // Only increments exist, so every element must climb to a common
        // target at least as high as the largest value already present;
        // the cheapest such target is that largest value itself.
        int target = nums[0];
        for (int num : nums) {
            if (num > target) {
                target = num;
            }
        }
        // Each element pays exactly its own deficit to reach it, and the
        // moves never interact, so the answer sums the deficits directly.
        int moves = 0;
        for (int num : nums) {
            moves += target - num;
        }
        return moves;
    }
};
