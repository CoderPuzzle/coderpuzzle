from typing import List


class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        # Sort, then interleave halves: the larger half occupies the even
        # indices, the smaller half the odd ones. Each even-indexed value
        # is then strictly above both (lower-half) neighbors and each
        # odd-indexed value strictly below both (upper-half) neighbors,
        # so no interior element can equal the average of its neighbors.
        nums.sort()
        n = len(nums)
        ans = [0] * n
        ans[0::2] = nums[n // 2 :]
        ans[1::2] = nums[: n // 2]
        return ans
