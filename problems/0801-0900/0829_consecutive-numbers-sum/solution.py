class Solution:
    def consecutiveNumbersSum(self, n: int) -> int:
        # A run of L consecutive positive integers starting at a sums to
        # L*a + L*(L-1)/2, so n has a length-L representation exactly when
        # n - L*(L-1)/2 is a positive multiple of L. The smallest sum of
        # L terms is 1 + 2 + ... + L = L*(L+1)/2: once that minimum passes
        # n no run fits, and below it the remainder is at least L, so
        # divisibility alone pins a >= 1. Length 1 always divides — the
        # single-term sum n = n.
        count = 0
        length = 1
        while length * (length + 1) // 2 <= n:
            if (n - length * (length - 1) // 2) % length == 0:
                count += 1
            length += 1
        return count
