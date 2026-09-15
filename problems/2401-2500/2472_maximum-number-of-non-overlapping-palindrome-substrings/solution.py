class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        # For each end index r, best[r] is the largest start l of a
        # palindrome s[l..r] with length at least k. Among all palindromes
        # ending at r, the one starting latest leaves the most room on the
        # left and reaches the biggest dp[l], since dp never decreases.
        n = len(s)
        best = [-1] * n
        for center in range(n):
            l = r = center
            while l >= 0 and r < n and s[l] == s[r]:
                if r - l + 1 >= k and l > best[r]:
                    best[r] = l
                l -= 1
                r += 1
        for center in range(n - 1):
            l, r = center, center + 1
            while l >= 0 and r < n and s[l] == s[r]:
                if r - l + 1 >= k and l > best[r]:
                    best[r] = l
                l -= 1
                r += 1
        # dp[i] = answer for the prefix s[0..i-1]; either skip index i-1 or
        # take the latest-starting palindrome that ends there.
        dp = [0] * (n + 1)
        for r in range(n):
            dp[r + 1] = dp[r]
            l = best[r]
            if l != -1 and dp[l] + 1 > dp[r + 1]:
                dp[r + 1] = dp[l] + 1
        return dp[n]
