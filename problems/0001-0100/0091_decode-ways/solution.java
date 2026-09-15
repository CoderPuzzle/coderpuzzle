class Solution {

    public int numDecodings(String s) {
        // prev2 / prev1 count the decodings of the prefixes ending two and one
        // position back; only those two feed the next position, so the full
        // prefix table collapses into two rolling variables. Prefix counts can
        // pass 2^31 even when the final answer fits, so both are long.
        long prev2 = 1; // empty prefix: exactly one way to decode nothing
        long prev1 = s.charAt(0) != '0' ? 1 : 0;
        for (int i = 1; i < s.length(); ++i) {
            long current = 0;
            // One digit s.charAt(i): a valid code on its own unless it is '0'.
            if (s.charAt(i) != '0') current += prev1;
            // Two digits s[i-1..i]: "1x" always, "2x" only up to "26".
            char first = s.charAt(i - 1);
            if (first == '1' || (first == '2' && s.charAt(i) <= '6')) current += prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return (int) prev1;
    }
}
