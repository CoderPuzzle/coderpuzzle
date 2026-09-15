class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        # Candidate value -> position, so the ways can be reported in the
        # order the backtracking search would meet them.
        position = {value: index for index, value in enumerate(candidates)}
        # table[amount] holds every way of reaching that amount with the
        # candidates processed so far. Owing nothing has exactly one way --
        # the empty one -- which seeds the sweep.
        table: list[list[list[int]]] = [[] for _ in range(target + 1)]
        table[0].append([])
        for value in candidates:
            for amount in range(value, target + 1):
                # Extend every way that is exactly `value` short. A way may
                # already contain this candidate: that is the unlimited
                # reuse, falling out of ascending amounts within one pass.
                for way in table[amount - value]:
                    table[amount].append(way + [value])
        # Candidate-outer passes pin each way to one order (its values grouped
        # by candidate position), but the table fills in amount order, so a
        # final lexicographic sort by position restores the discovery order.
        ways = table[target]
        ways.sort(key=lambda way: [position[value] for value in way])
        return ways
