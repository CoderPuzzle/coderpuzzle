class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        # A mirror reads the same both ways, so it survives reversing the
        # string: the answer is the longest common subsequence of s and its
        # reversal. Each row of that table reads only the row above, so two
        # rows carry the whole computation.
        t = s[::-1]
        prev = [0] * (n + 1)
        for i in range(1, n + 1):
            curr = [0] * (n + 1)
            for j in range(1, n + 1):
                if s[i - 1] == t[j - 1]:
                    # Agreeing first letters open a common subsequence built
                    # from the two remainders.
                    curr[j] = prev[j - 1] + 1
                else:
                    # At least one of the two first letters is absent from
                    # an optimal common subsequence.
                    curr[j] = max(prev[j], curr[j - 1])
            prev = curr
        return prev[n]
