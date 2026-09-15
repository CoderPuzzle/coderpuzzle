MOD = 10**9 + 7


class Solution:
    def numDecodings(self, s: str) -> int:
        # dp[i] counts the decodings of the suffix s[i:]: its first code is
        # one character (9 openings for '*', 1 for a nonzero digit, 0 for
        # '0') or two (15 for '**', 2 or 1 for '*d' as d <= 6 or not, 9/6/0
        # for 'd*' as d is 1/2/other, 1 for two digits valued 10..26).
        # Only dp[i+1] and dp[i+2] are ever read, so two rolling variables
        # replace the table; Python ints never overflow, so the raw pre-mod
        # step total is exact anyway.
        next1, next2 = 1, 1  # dp[i+1], dp[i+2]; the empty suffix is one way
        for i in range(len(s) - 1, -1, -1):
            a = s[i]
            cur = 0
            if a == "*":
                cur = 9 * next1
            elif a != "0":
                cur = next1
            if i + 1 < len(s):
                b = s[i + 1]
                if a == "*":
                    cur += next2 * (15 if b == "*" else 2 if b <= "6" else 1)
                elif a == "1":
                    cur += next2 * (9 if b == "*" else 1)
                elif a == "2":
                    cur += next2 * (6 if b == "*" else 1 if b <= "6" else 0)
            next2, next1 = next1, cur % MOD
        return next1
