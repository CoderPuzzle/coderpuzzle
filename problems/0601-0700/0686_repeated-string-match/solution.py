class Solution:
    def repeatedStringMatch(self, a: str, b: str) -> int:
        n, m = len(a), len(b)
        # q = ceil(m/n) is the least count whose text is even as long as b,
        # and no occurrence needs more than q + 1: a repeated forever has
        # period n, so any occurrence of b slides into the first q + 1 copies.
        q = (m + n - 1) // n
        repeated = a * q
        if b in repeated:
            return q
        repeated += a
        if b in repeated:
            return q + 1
        return -1
