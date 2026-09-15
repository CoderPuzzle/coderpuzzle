class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Prefix index 0 can only be fixed by a flip at i = 0, and after
        // fixing it nothing may flip it again — so a left-to-right sweep
        // is forced. flipped tracks whether the suffix seen so far is
        // currently inverted; each effective 0 forces one more flip,
        // which also re-inverts every later position at once. At most one
        // operation per index, so the count fits int for n <= 10^5.
        int ops = 0;
        bool flipped = false;
        for (int bit : nums) {
            if ((bit == 1) == flipped) {
                ++ops;
                flipped = !flipped;
            }
        }
        return ops;
    }
};
