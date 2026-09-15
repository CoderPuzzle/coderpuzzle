from typing import List


class Solution:
    def relocateMarbles(self, nums: List[int], moveFrom: List[int], moveTo: List[int]) -> List[int]:
        # Only occupancy matters: a move relocates every marble sitting on a
        # position at once, so one set of occupied positions tracks the state.
        occupied = set(nums)
        # In order: vacate the source, occupy the target. A self-move removes
        # and re-adds the same position; merging into an occupied target is
        # just a set add.
        for source, target in zip(moveFrom, moveTo):
            occupied.remove(source)
            occupied.add(target)
        return sorted(occupied)
