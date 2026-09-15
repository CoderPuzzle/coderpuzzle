from typing import List, Optional


class Solution:
    def countExcellentPairs(self, nums: List[int], k: int) -> int:
        # identity: popcount(a|b) + popcount(a&b) = popcount(a) + popcount(b),
        # so the pair condition depends only on the two individual bit counts
        counts = {}
        # dedupe: pairs are counted over distinct values; duplicates add nothing
        for x in set(nums):
            b = bin(x).count("1")
            counts[b] = counts.get(b, 0) + 1
        answer = 0
        # ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
        for b1, c1 in counts.items():
            for b2, c2 in counts.items():
                if b1 + b2 >= k:
                    answer += c1 * c2
        return answer
