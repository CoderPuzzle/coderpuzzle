from bisect import bisect_left
from typing import List


class Solution:
    def totalScore(self, hp: int, damage: List[int], requirement: List[int]) -> int:
        # pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at
        # room a+1, room b (b >= a+1) pays a point iff
        # hp - (pref[b] - pref[a]) >= requirement[b], i.e.
        # pref[a] >= requirement[b] - hp + pref[b]. Over all n(n+1)/2
        # subarrays this is a dominance count, done per b with a Fenwick
        # tree over compressed prefix sums holding pref[0..b-1]; failing
        # pairs (pref[a] < threshold) are subtracted from the total.
        n = len(damage)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + damage[i]
        values = sorted(set(pref))
        compress = {v: i for i, v in enumerate(values)}
        bit = [0] * (len(values) + 1)

        def add(pos: int) -> None:
            i = pos + 1
            while i < len(bit):
                bit[i] += 1
                i += i & -i

        def prefix(pos: int) -> int:
            total = 0
            i = pos
            while i > 0:
                total += bit[i]
                i -= i & -i
            return total

        add(compress[pref[0]])
        failing = 0
        for b in range(1, n + 1):
            threshold = requirement[b - 1] - hp + pref[b]
            # Number of inserted pref[a] with pref[a] < threshold.
            failing += prefix(bisect_left(values, threshold))
            add(compress[pref[b]])
        return n * (n + 1) // 2 - failing
