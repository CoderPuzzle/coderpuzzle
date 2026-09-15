from typing import List, Optional


class Solution:
    def dividePlayers(self, skill: List[int]) -> int:
        # The team total is fixed: the sum of all skills split evenly over
        # n // 2 teams. If the sum does not divide, no pairing can be even.
        # Otherwise the sorted array forces the weakest and strongest into
        # a team, which the two pointers check and price in one pass.
        n = len(skill)
        teams = n // 2
        total = sum(skill)
        if total % teams != 0:
            return -1
        target = total // teams

        skill.sort()
        chemistry = 0
        i, j = 0, n - 1
        while i < j:
            if skill[i] + skill[j] != target:
                return -1
            chemistry += skill[i] * skill[j]
            i += 1
            j -= 1
        return chemistry
