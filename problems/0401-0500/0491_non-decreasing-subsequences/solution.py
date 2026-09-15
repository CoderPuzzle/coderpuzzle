from typing import List, Set, Tuple


class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        # One decision per index — take the value or skip it — so every leaf
        # of the tree is exactly one subset of indices. A leaf holding at
        # least two non-decreasing values is one answer; equal values reach
        # the same value sequence through different index subsets, so a set
        # absorbs those duplicates and the final sort emits the pinned
        # lexicographic order.
        found: Set[Tuple[int, ...]] = set()
        current: List[int] = []

        def walk(index: int) -> None:
            if index == len(nums):
                if len(current) >= 2:
                    found.add(tuple(current))
                return
            # Take nums[index] when it does not decrease.
            if not current or nums[index] >= current[-1]:
                current.append(nums[index])
                walk(index + 1)
                current.pop()
            # Skip nums[index].
            walk(index + 1)

        walk(0)
        return [list(sequence) for sequence in sorted(found)]
