class Solution {

    public int balancedStringSplit(String s) {
        // +1 for L, -1 for R: every return to zero is one more balanced
        // piece, and cutting at each is the finest valid split.
        int balance = 0;
        int pieces = 0;
        for (int i = 0; i < s.length(); ++i) {
            balance += s.charAt(i) == 'L' ? 1 : -1;
            if (balance == 0) ++pieces;
        }
        return pieces;
    }
}
