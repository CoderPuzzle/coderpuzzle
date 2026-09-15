from collections import Counter
from typing import List


class Solution:
    def maxEqualFreq(self, nums: List[int]) -> int:
        count = Counter()  # value -> occurrences
        freq = Counter()  # occurrence count -> how many values have it
        best = 0
        for n, value in enumerate(nums, start=1):
            before = count[value]
            if before > 0:
                freq[before] -= 1
                if freq[before] == 0:
                    del freq[before]
            count[value] = before + 1
            freq[before + 1] += 1

            keys = sorted(freq)
            if len(keys) == 1:
                # One frequency class: fixable iff every value appears once
                # (remove any) or a single value holds everything.
                f = keys[0]
                if f == 1 or freq[f] == 1:
                    best = n
            elif len(keys) == 2:
                a, b = keys
                # One value one above a uniform class: drop one of its copies.
                if b == a + 1 and freq[b] == 1:
                    best = n
                # One singleton over a uniform class: drop the singleton.
                elif a == 1 and freq[a] == 1 and 1 + b * freq[b] == n:
                    best = n
        return best
