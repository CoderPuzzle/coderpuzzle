from typing import List


class Solution:
    def grayCode(self, n: int) -> List[int]:
        # The pinned order is its own recipe: element at index i is i ^ (i >> 1),
        # the standard reflected gray code. One loop, no post-processing.
        return [i ^ (i >> 1) for i in range(1 << n)]
