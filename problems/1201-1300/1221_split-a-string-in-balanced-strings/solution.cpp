class Solution {
  public:
    int balancedStringSplit(string s) {
        // +1 for L, -1 for R: every return to zero is one more balanced
        // piece, and cutting at each is the finest valid split.
        int balance = 0, pieces = 0;
        for (char ch : s) {
            balance += ch == 'L' ? 1 : -1;
            if (balance == 0)
                ++pieces;
        }
        return pieces;
    }
};
