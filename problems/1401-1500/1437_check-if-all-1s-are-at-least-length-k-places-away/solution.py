from typing import List, Optional


class Solution:
    def kLengthApart(self, nums: List[int], k: int) -> bool:
        previous: Optional[int] = None
        for index, value in enumerate(nums):
            if value == 1:
                if previous is not None and index - previous <= k:
                    return False
                previous = index
        return True
