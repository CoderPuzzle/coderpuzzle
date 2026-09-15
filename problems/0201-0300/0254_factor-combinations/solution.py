from typing import List


class Solution:
    def getFactors(self, n: int) -> List[List[int]]:
        combinations: List[List[int]] = []
        current: List[int] = []

        def backtrack(start: int, remaining: int) -> None:
            factor = start
            while factor * factor <= remaining:
                if remaining % factor == 0:
                    # factor closes a combination: the cofactor remaining //
                    # factor is at least factor, so both stay in [2, n - 1]
                    # and the list stays ascending.
                    combinations.append(current + [factor, remaining // factor])
                    current.append(factor)
                    # Split the cofactor further; the new start stays at
                    # factor so the next factor is at least as large.
                    backtrack(factor, remaining // factor)
                    current.pop()
                factor += 1

        backtrack(2, n)
        # Left-to-right growth emits each length group in lexicographic order
        # but interleaves the groups; the pinned display wants fewest factors
        # first, so reassemble by (length, lexicographic).
        combinations.sort(key=lambda combination: (len(combination), combination))
        return combinations
