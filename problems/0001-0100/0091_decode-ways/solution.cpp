class Solution {
  public:
    int numDecodings(string s) {
        // prev2 / prev1 count the decodings of the prefixes ending two and one
        // position back; only those two feed the next position, so the full
        // prefix table collapses into two rolling variables. Prefix counts can
        // pass 2^31 even when the final answer fits, so both are long long.
        long long prev2 = 1; // empty prefix: exactly one way to decode nothing
        long long prev1 = s[0] != '0' ? 1 : 0;
        for (int i = 1; i < (int)s.size(); ++i) {
            long long current = 0;
            // One digit s[i]: a valid code on its own unless it is '0'.
            if (s[i] != '0')
                current += prev1;
            // Two digits s[i-1..i]: "1x" always, "2x" only up to "26".
            if (s[i - 1] == '1' || (s[i - 1] == '2' && s[i] <= '6'))
                current += prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return (int)prev1;
    }
};
