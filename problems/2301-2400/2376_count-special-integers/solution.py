from typing import List, Optional


class Solution:
    def countSpecialNumbers(self, n: int) -> int:
        def perm(a, k):
            p = 1
            for i in range(k):
                p *= a - i
            return p

        digits = [int(ch) for ch in str(n)]
        L = len(digits)
        total = 0
        # Part 1: shorter lengths are all below n. A k-digit special number
        # picks a nonzero first digit, then ordered picks of the remaining 9.
        for k in range(1, L):
            total += 9 * perm(9, k - 1)
        # Part 2: walk n's digits, holding the prefix equal to n so far;
        # `used` is the bitmask of digits fixed in that prefix.
        used = 0
        for i, d in enumerate(digits):
            # Try each digit x < d not yet used (x >= 1 at position 0 to bar
            # leading zeros): any completion works, so count the ordered
            # picks for the remaining L-i-1 positions from unused digits.
            for x in range(1 if i == 0 else 0, d):
                if not (used >> x) & 1:
                    total += perm(10 - (i + 1), L - i - 1)
            # Extending with d itself repeats a digit: no same-length
            # special number shares this prefix, so the walk stops.
            if (used >> d) & 1:
                break
            used |= 1 << d
        else:
            # The walk finished with no repeat, so n itself is special.
            total += 1
        return total
