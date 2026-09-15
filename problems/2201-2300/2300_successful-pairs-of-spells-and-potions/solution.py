from typing import List, Optional
from bisect import bisect_left


class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        # a pair works iff spell * potion >= success, i.e. potion >= need;
        # successful potions are exactly the strongest suffix of the sorted list
        potions = sorted(potions)
        m = len(potions)
        result = []
        for spell in spells:
            # ceil(success / spell) in integer arithmetic: exact even at 1e10
            need = (success + spell - 1) // spell
            # bisect_left counts potions strictly below need; the rest succeed
            result.append(m - bisect_left(potions, need))
        return result
