from typing import List


class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        # Two prefixes with the same remainder mod k sandwich a subarray
        # whose sum is a multiple of k, so one pass keeps the running
        # remainder and the FIRST index it was seen at. The empty prefix
        # already has remainder 0 — seeding it at index -1 certifies
        # windows starting at index 0 and makes a zero-sum pair like
        # [0, 0] good, since 0 is a multiple of every k.
        first_index = {0: -1}
        remainder = 0
        for index, value in enumerate(nums):
            remainder = (remainder + value) % k
            earlier = first_index.get(remainder)
            # A repeat is a good subarray only when it spans two or more
            # elements, and only the earliest occurrence gives the widest
            # span — keep first, never overwrite.
            if earlier is not None and index - earlier >= 2:
                return True
            first_index.setdefault(remainder, index)
        return False
