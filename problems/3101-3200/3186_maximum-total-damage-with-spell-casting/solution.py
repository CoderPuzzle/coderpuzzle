from typing import List
from collections import Counter


class Solution:
    def maximumTotalDamage(self, power: List[int]) -> int:
        # Spell copies of equal damage are worthless to split: casting one
        # makes every other copy infeasible anyway (same damage), so each
        # distinct value acts as an all-or-nothing group worth count*v.
        # Sort those groups ascending and run a forward take/skip DP over
        # them; taking group v is legal only after predecessors <= v - 3,
        # located by a monotone left pointer (hint 1 keeps this linear).
        # Totals reach 10^14 at the bounds — beyond 32 bits, comfortably
        # inside Number's exact 2^53 window for JS/TS.
        totals = Counter(power)
        values = sorted(totals)
        m = len(values)
        best = [0] * m  # best[j]: maximum using groups values[0..j]
        left = 0  # first index whose value is still incompatible-pending
        for j, v in enumerate(values):
            while values[left] <= v - 3:
                left += 1
            take = totals[v] * v + (best[left - 1] if left else 0)
            skip = best[j - 1] if j else 0
            best[j] = max(skip, take)
        return best[m - 1]
