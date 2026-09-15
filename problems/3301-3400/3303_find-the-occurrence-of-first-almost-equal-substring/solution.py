class Solution:
    def minStartingIndex(self, s: str, pattern: str) -> int:
        # A window s[i:i+m] is almost equal to pattern iff its mismatches fit
        # in one slot: with f = forward match length at i (prefix of pattern)
        # and b = backward match length from the window's right end (suffix
        # of pattern), the window matches exactly when f == m, and when
        # f + b >= m - 1 the runs leave at most one character between them,
        # which a single change absorbs. Both tables come from Z-functions:
        # forward over pattern + sep + s; over the reversals, a prefix of the
        # reversed pattern matching at offset n - 1 - (window end) is exactly
        # a common suffix ending at that window end.
        n, m = len(s), len(pattern)
        codes = [ord(ch) for ch in s]
        z = self._z_function([ord(ch) for ch in pattern] + [-1] + codes)
        r = self._z_function([ord(ch) for ch in reversed(pattern)] + [-1] + [ord(ch) for ch in reversed(s)])
        for i in range(n - m + 1):
            f = min(z[m + 1 + i], m)
            if f >= m or f + min(r[m + 1 + n - i - m], m) >= m - 1:
                return i
        return -1

    def _z_function(self, values):
        m = len(values)
        z = [0] * m
        z[0] = m
        left = right = 0
        for i in range(1, m):
            if i < right:
                z[i] = min(right - i, z[i - left])
            while i + z[i] < m and values[z[i]] == values[i + z[i]]:
                z[i] += 1
            if i + z[i] > right:
                left, right = i, i + z[i]
        return z
