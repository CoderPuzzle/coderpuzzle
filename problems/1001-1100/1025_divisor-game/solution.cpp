class Solution {
  public:
    bool divisorGame(int n) {
        // win[i] is true if the player about to move at value i can force
        // a win. Every position only depends on smaller positions already
        // computed earlier in this same forward sweep.
        vector<bool> win(n + 1, false);
        for (int i = 1; i <= n; i++) {
            for (int x = 1; x < i; x++) {
                if (i % x == 0 && !win[i - x]) {
                    win[i] = true;
                    break;
                }
            }
        }
        return win[n];
    }
};
