from typing import List, Optional


class Solution:
    def maxHeight(self, cuboids: List[List[int]]) -> int:
        # Rotations are free, so sort each cuboid's dimensions — largest up
        # is simultaneously tallest and least constrained — then sort the
        # cuboids lexicographically so a potential base precedes its tippers.
        boxes = sorted(sorted(c) for c in cuboids)
        n = len(boxes)
        # dp[i]: tallest stack with cuboid i on top.
        dp = [box[2] for box in boxes]
        for i in range(n):
            # An earlier j whose sorted triple is component-wise <= i's can
            # support it (non-strict: equal dimensions may touch).
            for j in range(i):
                if boxes[j][0] <= boxes[i][0] and boxes[j][1] <= boxes[i][1] and boxes[j][2] <= boxes[i][2]:
                    if dp[j] + boxes[i][2] > dp[i]:
                        dp[i] = dp[j] + boxes[i][2]
        return max(dp)
