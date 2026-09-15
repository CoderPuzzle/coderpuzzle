class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        cut = list(range(-1, n))  # cut[0] = -1, cut[i] = i - 1 initially
        for c in range(n):
            # odd-length palindromes centered at c
            l, r = c, c
            while l >= 0 and r < n and s[l] == s[r]:
                # s[l..r] is a palindrome closing the prefix: one more cut.
                if cut[l] + 1 < cut[r + 1]:
                    cut[r + 1] = cut[l] + 1
                l -= 1
                r += 1
            # even-length palindromes centered between c and c + 1
            l, r = c, c + 1
            while l >= 0 and r < n and s[l] == s[r]:
                if cut[l] + 1 < cut[r + 1]:
                    cut[r + 1] = cut[l] + 1
                l -= 1
                r += 1
        return cut[n]
