class Solution {
  public:
    int scoreDifference(vector<int> &nums) {
        // Totals stay within 1000 * 1000 = 10^6 and the difference within
        // ±10^6, so int arithmetic carries everything without overflow.
        // One pass with a signed turn: +1 while the first player is active,
        // -1 while the second is. Each rule that fires flips the sign — odd
        // points flip once, a 6th-game index flips once — and when both fire
        // on the same game the flips cancel, exactly the sequential double
        // swap. The active player's points then enter the first-minus-second
        // difference as turn * points.
        int diff = 0;
        int turn = 1;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] % 2 == 1) {
                turn = -turn;
            }
            if (i % 6 == 5) {
                turn = -turn;
            }
            diff += turn * nums[i];
        }
        return diff;
    }
};
