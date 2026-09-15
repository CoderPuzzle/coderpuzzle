from typing import List


class Solution:
    def minCost(self, nums: List[int], x: int) -> int:
        # Try every rotation count k in [0, n): after k operations, buying
        # type t costs nums[(t - k) mod n], so each step only adds one new
        # candidate price per type on top of the ones already seen.
        n = len(nums)
        # cheapest[t] tracks the lowest price seen so far for type t.
        cheapest = list(nums)
        answer = sum(cheapest)
        for rotations in range(1, n):
            total = 0
            for t in range(n):
                price = nums[(t - rotations + n) % n]
                if price < cheapest[t]:
                    cheapest[t] = price
                total += cheapest[t]
            answer = min(answer, total + rotations * x)
        return answer
