from typing import List, Optional


class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        # ans is nums followed by a second copy of nums: each value lands at
        # index i and again at index i + n.
        return nums + nums
