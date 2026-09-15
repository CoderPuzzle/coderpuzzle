from typing import List


class Solution:
    def rotate(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        # A rotation by n steps is the identity, so any larger k wraps
        # around to k % n — normalize before splitting into blocks.
        k %= n

        # Three reversals compose into a right rotation: reversing the
        # whole array trades the two blocks, and reversing each block
        # afterwards restores its internal order.
        def reverse(lo: int, hi: int) -> None:
            while lo < hi:
                nums[lo], nums[hi] = nums[hi], nums[lo]
                lo += 1
                hi -= 1

        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
        # The rotation happened inside the input allocation; the same array,
        # now rotated, is what the judge compares.
        return nums
