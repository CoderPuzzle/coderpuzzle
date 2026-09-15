class Solution {

    public int findTheLongestBalancedSubstring(String s) {
        // One pass with two run counters: `zeros` is the length of the zero
        // block currently ending (reset when a fresh block starts after ones),
        // `ones` is the running tail of consecutive ones. A balanced substring
        // is always a prefix-tail pairing min(zeros, ones) of both, so every
        // one seen offers 2 * min as a candidate answer.
        int best = 0;
        int zeros = 0;
        int ones = 0;
        char prev = ' ';
        for (char ch : s.toCharArray()) {
            if (ch == '0') {
                zeros = prev == '0' ? zeros + 1 : 1;
                ones = 0;
            } else {
                ones++;
                best = Math.max(best, 2 * Math.min(zeros, ones));
            }
            prev = ch;
        }
        return best;
    }
}
