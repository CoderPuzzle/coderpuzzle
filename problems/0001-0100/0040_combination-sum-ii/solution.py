from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        # Fresh sorted list: caller's array is untouched. Sorting makes every
        # emitted combination ascending, and growing combinations left to
        # right emits them in lexicographic order.
        candidates = sorted(candidates)
        combinations: List[List[int]] = []
        current: List[int] = []

        def backtrack(start: int, remaining: int) -> None:
            if remaining == 0:
                # Hit the target exactly: snapshot the current path.
                combinations.append(current[:])
                return
            for i in range(start, len(candidates)):
                # A value equal to the one just abandoned at this depth would
                # rebuild the same combination, so skip runs of equal values.
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                # Sorted order means the first value too large to fit ends
                # the loop: every later value is at least as large.
                if candidates[i] > remaining:
                    break
                current.append(candidates[i])
                # i + 1, not i: every candidate number may be used only once.
                backtrack(i + 1, remaining - candidates[i])
                current.pop()

        backtrack(0, target)
        return combinations
