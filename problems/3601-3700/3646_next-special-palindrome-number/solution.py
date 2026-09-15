from typing import List, Optional


class Solution:
    def specialPalindrome(self, n: int) -> int:
        # A palindrome carries at most one digit an odd number of times, so a
        # digit set works only with at most one odd member; any set whose
        # digits sum past 16 makes palindromes of 17+ digits, beyond every
        # answer reachable from n <= 10^15.
        limit = 4 * 10**15
        answer = limit
        for mask in range(1, 512):
            digits = []
            odds, total = 0, 0
            for d in range(1, 10):
                if mask >> (d - 1) & 1:
                    digits.append(d)
                    odds += d & 1
                    total += d
            if odds > 1 or total > 16:
                continue
            # Each member k lays k // 2 copies into each half (built ascending,
            # since digits are); a lone odd member also takes the middle.
            mid = 0
            half = []
            for d in digits:
                if d & 1:
                    mid = d
                half += [d] * (d // 2)
            # Mirroring preserves order, so lexicographic halves enumerate this
            # set's palindromes in increasing numeric order.
            while True:
                pal = 0
                for d in half:
                    pal = pal * 10 + d
                if mid:
                    pal = pal * 10 + mid
                for d in reversed(half):
                    pal = pal * 10 + d
                if pal > limit:
                    break  # later halves only mirror to larger numbers
                if pal > n:
                    answer = min(answer, pal)
                    break  # first past n is this set's best
                if not self._next_permutation(half):
                    break
        return answer

    def _next_permutation(self, a: List[int]) -> bool:
        # Advance a multiset to its next distinct permutation in place;
        # False once it has reached the last (descending) arrangement.
        i = len(a) - 2
        while i >= 0 and a[i] >= a[i + 1]:
            i -= 1
        if i < 0:
            return False
        j = len(a) - 1
        while a[j] <= a[i]:
            j -= 1
        a[i], a[j] = a[j], a[i]
        a[i + 1 :] = reversed(a[i + 1 :])
        return True
