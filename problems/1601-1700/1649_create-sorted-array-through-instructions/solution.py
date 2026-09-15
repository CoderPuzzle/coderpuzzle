from typing import List, Optional


class Solution:
    def createSortedArray(self, instructions: List[int]) -> int:
        MOD = 10**9 + 7
        m = max(instructions)
        # Fenwick tree indexed by value: prefix counts with point updates.
        tree = [0] * (m + 1)

        def update(i: int) -> None:
            # Climb the lowbit ladder to add one occurrence of value i.
            while i <= m:
                tree[i] += 1
                i += i & (-i)

        def query(i: int) -> int:
            # Sum of occurrences of values 1..i.
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s

        total = 0
        count = 0
        for x in instructions:
            # Inserting x costs the smaller of: elements strictly below x
            # (query(x-1)) and strictly above (count - query(x), since
            # query(x) includes equals — equals land in neither bucket).
            less = query(x - 1)
            greater = count - query(x)
            total = (total + min(less, greater)) % MOD
            update(x)
            count += 1
        return total
