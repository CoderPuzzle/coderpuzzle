from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        combinations: List[List[int]] = []
        current: List[int] = []

        def walk(start: int) -> None:
            # A full pick of k numbers is one combination.
            if len(current) == k:
                # Copy: current is the shared buffer for the next branch.
                combinations.append(current[:])
                return
            # Ascending start values make each combination ascending and the
            # walk emit lexicographic order directly. The bound keeps only
            # values that leave enough larger numbers to fill the rest.
            for value in range(start, n - (k - len(current)) + 2):
                current.append(value)
                walk(value + 1)
                current.pop()

        walk(1)
        return combinations
