class Solution {

    public int minimumPartition(String s, int k) {
        // Greedy from the left: extend the current piece while its value
        // stays <= k, since splitting as late as possible is optimal. The
        // tentative value k * 10 + 9 exceeds int range, so widen to long.
        int pieces = 1;
        long value = 0;
        for (int i = 0; i < s.length(); ++i) {
            int digit = s.charAt(i) - '0';
            long candidate = value * 10 + digit;
            if (candidate <= k) {
                value = candidate;
            } else {
                // This digit must open a new piece; fail if it cannot stand
                // alone either.
                if (digit > k) return -1;
                ++pieces;
                value = digit;
            }
        }
        return pieces;
    }
}
