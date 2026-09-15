from typing import List, Optional


class Solution:
    def sumScores(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        z = [0] * n
        # s_n = s is its own longest prefix; each s_i is a suffix scoring z[n - i]
        z[0] = n
        left = right = 0
        for i in range(1, n):
            if i < right:
                # inside the window [left, right): reuse the mirrored z[i - left],
                # capped at right - i so the guess stays within verified territory
                z[i] = min(right - i, z[i - left])
            # extend by direct comparison as far as the match truly goes
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            # track the rightmost window; its forward growth bounds work by O(n)
            if i + z[i] > right:
                left, right = i, i + z[i]
        return sum(z)
