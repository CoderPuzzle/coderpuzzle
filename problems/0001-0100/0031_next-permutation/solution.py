from typing import List


class Solution:
    def nextPermutation(self, nums: List[int]) -> List[int]:
        # Scan from the right for the pivot: the first element smaller than
        # its successor. Everything after it is a non-increasing suffix, the
        # largest arrangement of that tail, so the pivot is the only position
        # that can still grow while the prefix stays fixed.
        pivot = len(nums) - 2
        while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:
            pivot -= 1
        if pivot >= 0:
            # The rightmost value exceeding the pivot is the smallest one
            # that does; the >= above means equals are stepped over.
            successor = len(nums) - 1
            while nums[successor] <= nums[pivot]:
                successor -= 1
            nums[pivot], nums[successor] = nums[successor], nums[pivot]
        # The suffix is still non-increasing after the swap, so reversing it
        # yields the smallest possible tail. No pivot means the whole array
        # was the last permutation, and the full reverse wraps to the first.
        left, right = pivot + 1, len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
        return nums
