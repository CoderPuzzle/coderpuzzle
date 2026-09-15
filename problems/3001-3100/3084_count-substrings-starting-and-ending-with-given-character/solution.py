class Solution:
    def countSubstrings(self, s: str, c: str) -> int:
        # Only the positions of c matter: a substring starts and ends with c
        # exactly when both endpoints land on an occurrence, so choosing a
        # substring is choosing two (not necessarily distinct) occurrences,
        # in order. With m occurrences that is m*(m+1)//2 pairs, which can
        # reach ~5*10**9 at n = 10**5 — beyond 32-bit, fine for Python ints.
        m = s.count(c)
        return m * (m + 1) // 2
