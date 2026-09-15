from itertools import accumulate
from math import isqrt
from typing import List


class Solution:
    def solve(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        """A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per
        query when walked directly, which stays cheap only for large y.
        Split the queries on B ~ sqrt(n): every y <= B gets a residue
        table making each such query one lookup, while any y > B strides
        at most n/B ~ B indices straight out of nums. A full suffix sums
        to 5*10^4 * 10^9 = 5*10^13 before the modulus, so every answer is
        reduced mod 1e9+7 at the end (Python ints carry the sums exactly).
        This port groups queries by y and builds one y's residue chains
        at a time — accumulate along each chain, a hit reading chain
        total minus the prefix before its start — so memory stays O(n)
        instead of holding B tables of Python ints at once.
        """
        MOD = 1_000_000_007
        n = len(nums)
        limit = isqrt(n)
        answer = [0] * len(queries)
        by_y = {}
        for i, (x, y) in enumerate(queries):
            if y > limit:
                answer[i] = sum(nums[x::y]) % MOD
            else:
                by_y.setdefault(y, []).append(i)
        for y, hits in by_y.items():
            prefix = [list(accumulate(nums[r::y])) for r in range(y)]
            for i in hits:
                chain = prefix[queries[i][0] % y]
                k = queries[i][0] // y
                answer[i] = (chain[-1] - (chain[k - 1] if k else 0)) % MOD
        return answer
