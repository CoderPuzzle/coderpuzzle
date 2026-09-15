from bisect import bisect_right
from typing import List


class Solution:
    def countArrays(self, digitSum: List[int]) -> int:
        MOD = 10**9 + 7
        # Group every value 0..5000 by the sum of its digits; the groups are
        # sorted, so a prefix sum plus upper_bound counts every predecessor
        # whose value is at most a candidate's value in O(log).
        groups = [[] for _ in range(51)]
        for value in range(5001):
            total = 0
            rest = value
            while rest:
                total += rest % 10
                rest //= 10
            groups[total].append(value)
        if not groups[digitSum[0]]:
            return 0
        dp = [1] * len(groups[digitSum[0]])
        previous = groups[digitSum[0]]
        for target in digitSum[1:]:
            current = groups[target]
            if not current:
                return 0
            prefix = [0] * (len(dp) + 1)
            for index, ways in enumerate(dp):
                prefix[index + 1] = (prefix[index] + ways) % MOD
            dp = [prefix[bisect_right(previous, value)] for value in current]
            previous = current
        return sum(dp) % MOD
