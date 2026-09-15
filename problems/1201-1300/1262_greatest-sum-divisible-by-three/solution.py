from typing import List


class Solution:
    def maxSumDivThree(self, nums: List[int]) -> int:
        # best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
        NEG = -1
        best = [0, NEG, NEG]
        for x in nums:
            candidate = list(best)
            for r in range(3):
                if best[r] != NEG:
                    nr = (r + x) % 3
                    if best[r] + x > candidate[nr]:
                        candidate[nr] = best[r] + x
            best = candidate
        return best[0]
