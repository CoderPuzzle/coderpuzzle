from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        # Fresh sorted list: caller's array is untouched. Sorting makes each
        # branch choose among the remaining values in ascending order, so the
        # subsets emerge in the pinned ascending lexicographic order.
        values = sorted(nums)
        subsets: List[List[int]] = []
        current: List[int] = []

        def backtrack(start: int) -> None:
            # Every node of the walk is itself a subset: the root is [].
            subsets.append(current[:])
            for i in range(start, len(values)):
                # A value equal to the sibling just tried at this level would
                # rebuild the same subset, so skip runs of equal values: only
                # the first copy of a run may open a branch here.
                if i > start and values[i] == values[i - 1]:
                    continue
                current.append(values[i])
                backtrack(i + 1)
                current.pop()

        backtrack(0)
        return subsets
