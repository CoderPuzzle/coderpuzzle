from typing import List


class Solution:
    def maximumBeauty(self, flowers: List[int]) -> int:
        # A valid garden keeps two equally beautiful endpoints i < j and,
        # since removal is free, every positive strictly between them: its
        # sum is 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0)
        # below k. seen[v] tracks the smallest P[i+1] over past occurrences
        # of v (P only grows, so that is the first one). Totals stay under
        # 1e5 * 1e4 + 2e4 < 2^31 - 1.
        seen = {}
        pos = 0
        answer = -(10**9)
        for v in flowers:
            if v in seen:
                answer = max(answer, 2 * v + pos - seen[v])
            if v > 0:
                pos += v
            if v not in seen or pos < seen[v]:
                seen[v] = pos
        return answer
