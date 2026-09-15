from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        # Trying digits in ascending order from a rising start floor makes
        # every combination ascending and the whole list lexicographic.
        combinations: List[List[int]] = []
        current: List[int] = []

        def backtrack(start: int, slots: int, remaining: int) -> None:
            if slots == 0:
                # k digits chosen: valid only when they sum to n exactly.
                if remaining == 0:
                    combinations.append(current[:])
                return
            # start moves past each picked digit, so each number 1 through 9
            # is used at most once; a digit must also leave slots - 1 larger
            # digits behind, which caps it at 10 - slots.
            for digit in range(start, 10 - slots + 1):
                # Digits grow across the loop, so the first one that
                # overshoots the remaining budget ends the loop.
                if digit > remaining:
                    break
                current.append(digit)
                backtrack(digit + 1, slots - 1, remaining - digit)
                current.pop()

        backtrack(1, k, n)
        return combinations
