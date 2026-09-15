class Solution {

    public int minPartitions(String n) {
        // Every deci-binary summand contributes at most 1 to any one digit
        // position, so k summands leave every digit <= k — the answer is at
        // least the largest digit. Subtracting one deci-binary layer per pass
        // (a 1 under every still-positive digit) attains that bound exactly,
        // so the answer is the largest digit: scan for it.
        int best = 0;
        for (int i = 0; i < n.length(); i++) {
            int digit = n.charAt(i) - '0';
            if (digit > best) {
                best = digit;
            }
        }
        return best;
    }
}
