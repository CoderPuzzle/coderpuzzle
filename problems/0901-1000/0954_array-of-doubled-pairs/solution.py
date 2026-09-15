from collections import Counter, defaultdict
from typing import List


class Solution:
    def canReorderDoubled(self, arr: List[int]) -> bool:
        # A pair is (x, 2x), so the value of smallest absolute value has no
        # choice: its half is smaller in magnitude and cannot be waiting for
        # it, so every copy must claim a double. Walk the distinct values in
        # ascending absolute value, carrying each value's unclaimed copies
        # forward as a demand on its double; a demand that outruns the
        # supply, or aims at a value the array never held, makes the
        # pairing impossible. Zero is its own double, so its count must be
        # even.
        count = Counter(arr)
        need = defaultdict(int)
        for value in sorted(count, key=abs):
            if value == 0:
                if count[0] % 2:
                    return False
                continue
            if need[value] > count[value]:
                return False
            extra = count[value] - need[value]
            if extra and 2 * value not in count:
                return False
            need[2 * value] += extra
        return True
