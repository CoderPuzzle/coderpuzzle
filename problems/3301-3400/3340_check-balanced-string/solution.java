class Solution {

    public boolean isBalanced(String num) {
        // Only the two digit totals matter, and one pass can carry both
        // at once: add every digit sitting at an even index and subtract
        // every digit at an odd index. The even- and odd-index sums are
        // equal exactly when the signed total ends back at zero, so no
        // second pass or pair of accumulators is needed.
        int balance = 0;
        for (int i = 0; i < num.length(); i++) {
            balance += i % 2 == 0 ? num.charAt(i) - '0' : '0' - num.charAt(i);
        }
        return balance == 0;
    }
}
