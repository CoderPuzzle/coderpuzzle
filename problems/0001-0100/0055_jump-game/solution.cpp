class Solution {
  public:
    bool canJump(vector<int> &nums) {
        // farthest is the largest index reachable using any sequence of
        // jumps among positions visited so far; an index is standable
        // exactly when index <= farthest (reachability grows continuously).
        int farthest = 0;
        int last = (int)nums.size() - 1;
        for (int index = 0; index < (int)nums.size(); index++) {
            int reach = nums[index];
            // Standability check first: a gap no jump can cross has opened,
            // so the last index is unreachable. Must run before the update.
            if (index > farthest) {
                return false;
            }
            // Extend the reach to index + nums[index] when it beats the
            // running maximum.
            if (index + reach > farthest) {
                farthest = index + reach;
            }
            // The reach now covers the last index: answer true on the spot
            // (also covers the single-element input, with farthest = 0).
            if (farthest >= last) {
                return true;
            }
        }
        return true;
    }
};
