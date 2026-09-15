from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # Every operation lowers the total sum by exactly 1, and the
        # elements only bound how many operations are even possible
        # (sum in total), never the residue. So the cheapest reachable sum
        # that is divisible by k is the largest multiple of k not exceeding
        # the sum, and the answer is the distance down to it: sum % k.
        total = 0
        for v in nums:
            total += v
        return total % k
