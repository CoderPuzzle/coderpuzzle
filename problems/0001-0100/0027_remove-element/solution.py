from typing import List


class Solution:
    def removeElement(self, nums: List[int], val: int) -> List[int]:
        # Write pointer: nums[:k] always holds the survivors seen so far, so
        # one read pass compacts them to the front in place — no shifting.
        k = 0
        for value in nums:
            if value != val:
                nums[k] = value
                k += 1
        # The statement frees both the order and the tail beyond k, so the
        # compacted prefix is the whole judged answer; its length is k.
        return nums[:k]
