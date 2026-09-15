from typing import List, Optional


class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        # A square is 4 equal-length groups: the total must split evenly and
        # no single stick may exceed the side.
        if total % 4 != 0:
            return False
        side = total // 4
        # Descending order places the most constrained sticks first, so a
        # dead end appears after only a few branches.
        sticks = sorted(matchsticks, reverse=True)
        if not sticks or sticks[0] > side:
            return False
        sides = [0, 0, 0, 0]

        def dfs(i):
            if i == len(sticks):
                # Guaranteed by the capacity checks + total = 4 * side;
                # kept as a final safety assertion.
                return sides[0] == sides[1] == sides[2] == sides[3] == side
            value = sticks[i]
            tried = set()
            for j in range(4):
                # Sides with equal current length are interchangeable —
                # trying one per distinct length skips symmetric states.
                if sides[j] in tried:
                    continue
                tried.add(sides[j])
                # Place/recurse/undo on every side with room left.
                if sides[j] + value <= side:
                    sides[j] += value
                    if dfs(i + 1):
                        return True
                    sides[j] -= value
            return False

        return dfs(0)
