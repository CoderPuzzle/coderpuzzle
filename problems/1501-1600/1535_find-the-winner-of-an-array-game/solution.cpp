class Solution {
  public:
    int getWinner(vector<int> &arr, int k) {
        // Track the running champion and its win streak in a single
        // left-to-right pass; this reproduces the same sequence of wins the
        // literal move-loser-to-the-back simulation would produce.
        int champion = arr[0];
        int streak = 0;
        for (int i = 1; i < (int)arr.size(); ++i) {
            if (arr[i] > champion) {
                champion = arr[i];
                streak = 1;
            } else {
                ++streak;
            }
            if (streak >= k) {
                return champion;
            }
        }
        return champion;
    }
};
