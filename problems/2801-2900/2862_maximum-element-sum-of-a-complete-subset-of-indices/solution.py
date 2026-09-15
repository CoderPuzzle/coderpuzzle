from typing import List, Optional
from collections import defaultdict


class Solution:
    def maximumSum(self, nums: List[int]) -> int:
        def squarefree_part(x):
            # Product of primes with odd exponent in x, e.g. P(18) = 2.
            # Trial division suffices: only indices are factored, not
            # arbitrary values. Anything surviving the loop is one leftover
            # prime with exponent one.
            result = 1
            d = 2
            while d * d <= x:
                if x % d == 0:
                    count = 0
                    while x % d == 0:
                        x //= d
                        count += 1
                    if count % 2 == 1:
                        result *= d
                d += 1
            if x > 1:
                result *= x
            return result

        # Writing each index as (squarefree part) x (perfect square), the
        # product of two indices is a perfect square exactly when their
        # squarefree parts match — so complete subsets are precisely the
        # indices sharing one squarefree part. Sum per group, take the max;
        # singletons qualify since the pair condition is vacuous.
        groups = defaultdict(int)
        for i in range(1, len(nums) + 1):
            groups[squarefree_part(i)] += nums[i - 1]
        return max(groups.values())
