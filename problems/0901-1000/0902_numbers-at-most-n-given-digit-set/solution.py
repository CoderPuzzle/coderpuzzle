from typing import List, Optional


class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        # Numbers shorter than n are composeable by construction and all
        # fall below n; for n's own length, walk its digits: a set digit
        # strictly below the current one fixes a smaller prefix and frees
        # the remaining positions, while the equal path survives only
        # while n's own digit stays in the set.
        s = str(n)
        length = len(s)
        k = len(digits)
        has = [False] * 10
        for d in digits:
            has[int(d)] = True
        below = [0] * 10
        for v in range(1, 10):
            below[v] = below[v - 1] + (1 if has[v - 1] else 0)
        powers = [1] * (length + 1)
        for j in range(1, length + 1):
            powers[j] = powers[j - 1] * k
        total = sum(powers[1:length])
        for i, ch in enumerate(s):
            v = ord(ch) - 48
            # Set digits below n's digit v leave the tail free.
            total += below[v] * powers[length - 1 - i]
            if not has[v]:
                # The equal path dies here: no prefix of n extends past v.
                break
        else:
            # Every digit of n is in the set, so n itself counts.
            total += 1
        return total
