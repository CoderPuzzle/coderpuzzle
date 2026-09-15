class Solution {
  public:
    int numDecodings(string s) {
        // dp[i] counts the decodings of the suffix s[i:]: its first code is
        // one character (9 openings for '*', 1 for a nonzero digit, 0 for
        // '0') or two (15 for '**', 2 or 1 for '*d' as d <= 6 or not, 9/6/0
        // for 'd*' as d is 1/2/other, 1 for two digits valued 10..26).
        // Only dp[i+1] and dp[i+2] are ever read, so two rolling variables
        // replace the table; `cur` is int64_t: before its reduction one
        // step totals up to 9 * next1 + 15 * next2, near 24 * MOD, past
        // 32-bit range.
        const int64_t MOD = 1'000'000'007;
        int n = s.size();
        int64_t next1 = 1, next2 = 1; // dp[i+1], dp[i+2]; the empty suffix is one way
        for (int i = n - 1; i >= 0; --i) {
            char a = s[i];
            int64_t cur = 0;
            if (a == '*')
                cur = 9 * next1;
            else if (a != '0')
                cur = next1;
            if (i + 1 < n) {
                char b = s[i + 1];
                if (a == '*')
                    cur += next2 * (b == '*' ? 15 : b <= '6' ? 2 : 1);
                else if (a == '1')
                    cur += next2 * (b == '*' ? 9 : 1);
                else if (a == '2')
                    cur += next2 * (b == '*' ? 6 : b <= '6' ? 1 : 0);
            }
            next2 = next1;
            next1 = cur % MOD;
        }
        return static_cast<int>(next1);
    }
};
