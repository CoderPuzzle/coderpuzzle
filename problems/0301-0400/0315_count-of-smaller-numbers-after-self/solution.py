from typing import List, Optional


class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        offset = 10002  # maps nums[i] in [-10^4, 10^4] to a positive index
        size = 20005
        bit = [0] * (size + 1)

        def update(i, delta):
            while i <= size:
                bit[i] += delta
                i += i & (-i)

        def query(i):
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total

        result = []
        for value in reversed(nums):
            index = value + offset
            result.append(query(index - 1))
            update(index, 1)
        return result[::-1]
