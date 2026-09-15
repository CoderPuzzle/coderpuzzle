class Solution {
  public:
    int minOperations(string s) {
        // Every occurrence of the chosen letter advances one step per
        // operation, so a letter whose zero-based alphabet index is i
        // needs (26 - i) % 26 operations of its own to reach 'a'.
        // Driving the letter with the largest remaining distance lets
        // slower letters catch up, merge, and ride along, so nothing
        // beyond that largest distance is ever paid.
        int best = 0;
        for (char ch : s) {
            best = max(best, (26 - (ch - 'a')) % 26);
        }
        return best;
    }
};
