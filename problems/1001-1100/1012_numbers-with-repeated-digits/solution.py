from typing import List, Optional


class Solution:
    def numDupDigitsAtMostN(self, n: int) -> int:
        # Complement counting: tally numbers in [1, n] with all-distinct digits.
        digits = list(map(int, str(n)))
        length = len(digits)

        def distinct_count(d):
            # d distinct digits: 9 choices first (no leading zero), then 9*8*7*...
            prod = 9
            for i in range(1, d):
                prod *= 10 - i
            return prod

        # Every length strictly shorter than n's own length.
        distinct = 0
        for d in range(1, length):
            distinct += distinct_count(d)

        # Walk n's own digit string prefix by prefix.
        used = set()
        for i, digit in enumerate(digits):
            start = 1 if i == 0 else 0
            # Each smaller unused candidate digit fixes a distinct prefix; the
            # remaining slots take any falling permutation of unused digits.
            smaller = sum(1 for cand in range(start, digit) if cand not in used)
            remaining = length - i - 1
            perms = 1
            avail = 10 - (i + 1)
            for _ in range(remaining):
                perms *= avail
                avail -= 1
            distinct += smaller * perms
            # A repeated digit here means no longer number shares this prefix.
            if digit in used:
                break
            used.add(digit)
        else:
            # The walk never broke: n itself has all-distinct digits.
            distinct += 1

        return n - distinct
