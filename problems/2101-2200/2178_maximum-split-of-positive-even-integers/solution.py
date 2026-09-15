from typing import List


class Solution:
    def maximumEvenSplit(self, finalSum: int) -> List[int]:
        # An odd total can never be a sum of even numbers. Otherwise take
        # the smallest evens 2, 4, 6, ... as long as the leftover still
        # allows a strictly larger final part; dump the leftover into that
        # last part, which keeps every value unique.
        if finalSum % 2 != 0:
            return []
        parts = []
        take = 2
        remaining = finalSum
        while remaining - take > take:
            parts.append(take)
            remaining -= take
            take += 2
        parts.append(remaining)
        return parts
