from typing import List


class Solution:
    def removeDuplicates(self, nums: List[int]) -> List[int]:
        # Sorted order puts every duplicate run adjacent, so one forward
        # scan can compact the array in place: write marks the end of the
        # unique prefix built so far, and the first element is always kept.
        write = 1
        for read in range(1, len(nums)):
            # nums[write - 1] is the last value kept; in a sorted array the
            # scan meets a new value exactly when the previous run ends.
            if nums[read] != nums[write - 1]:
                nums[write] = nums[read]
                write += 1
        # The statement frees the tail beyond the unique prefix, so the
        # compacted prefix is the whole judged answer; its length is k.
        return nums[:write]
