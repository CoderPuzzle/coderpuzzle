from array import array


class Solution:
    def longestPalindrome(self, word1: str, word2: str) -> int:
        n1 = len(word1)
        s = word1 + word2
        n = len(s)
        # dp[i][j] holds the longest palindromic subsequence of s[i..j].
        # array('H') rows keep the 2001x2001 table compact at the limits.
        dp = [array("H", bytes(2 * (n + 1))) for _ in range(n + 1)]
        best = 0
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            si = s[i]
            row = dp[i]
            below = dp[i + 1]
            for j in range(i + 1, n):
                if si == s[j]:
                    length = below[j - 1] + 2
                    row[j] = length
                    # Equal ends straddling the boundary mean both words
                    # contribute at least one character of the palindrome.
                    if i < n1 <= j and length > best:
                        best = length
                else:
                    row[j] = max(below[j], row[j - 1])
        return best
