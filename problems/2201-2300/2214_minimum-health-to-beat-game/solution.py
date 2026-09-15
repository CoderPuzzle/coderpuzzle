from typing import List


class Solution:
    def minimumHealth(self, damage: List[int], armor: int) -> int:
        # Total damage must be survived with health to spare, and the one
        # armor use erases min(armor, worst level) of it.
        total = 0
        worst = 0
        for hit in damage:
            total += hit
            if hit > worst:
                worst = hit
        return total + 1 - min(armor, worst)
