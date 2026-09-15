from typing import List, Optional


class Solution:
    def maxCoins(self, lane1: List[int], lane2: List[int]) -> int:
        NEG = float("-inf")

        n = len(lane1)
        # prev1[r] / prev2[r]: best coins for a ride ending at the previous mile,
        # in lane 1 / lane 2, with r lane switches still remaining.
        prev1 = [NEG, NEG, NEG]
        prev2 = [NEG, NEG, NEG]
        best = NEG
        for i in range(n):
            v1 = lane1[i]
            v2 = lane2[i]
            cur1 = [NEG, NEG, NEG]
            cur2 = [NEG, NEG, NEG]
            # fresh start at mile i (enter on lane 1, may switch immediately)
            cur1[2] = max(cur1[2], v1)
            cur2[1] = max(cur2[1], v2)
            for r in range(3):
                if prev1[r] != NEG:
                    cur1[r] = max(cur1[r], prev1[r] + v1)  # stay in lane 1
                    if r > 0:
                        cur2[r - 1] = max(cur2[r - 1], prev1[r] + v2)  # switch to lane 2
                if prev2[r] != NEG:
                    cur2[r] = max(cur2[r], prev2[r] + v2)  # stay in lane 2
                    if r > 0:
                        cur1[r - 1] = max(cur1[r - 1], prev2[r] + v1)  # switch to lane 1
            prev1, prev2 = cur1, cur2
            for r in range(3):
                if prev1[r] > best:
                    best = prev1[r]
                if prev2[r] > best:
                    best = prev2[r]
        return best
