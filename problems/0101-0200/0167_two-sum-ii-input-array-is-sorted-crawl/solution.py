from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        # Sorted order lets two indexes converge from both ends: the smallest
        # and largest remaining values stand in for every candidate pair, and
        # no extra storage is needed, as the statement demands.
        low, high = 0, len(numbers) - 1
        while low < high:
            total = numbers[low] + numbers[high]
            if total == target:
                # The statement's contract is 1-indexed.
                return [low + 1, high + 1]
            if total < target:
                # Too small: numbers[low] plus anything above numbers[high]
                # only shrinks, so low has no partner left.
                low += 1
            else:
                # Too large: numbers[high] plus anything below numbers[low]
                # only shrinks, so high has no partner left.
                high -= 1
        # Statement promises a solution exists; empty is just the fallback.
        return []
