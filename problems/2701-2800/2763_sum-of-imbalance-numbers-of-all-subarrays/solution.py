from typing import List


class Solution:
    def sumImbalanceNumbers(self, nums: List[int]) -> int:
        n = len(nums)
        total = 0
        for i in range(n):
            # Seed with the single-element window: its imbalance is 0.
            seen = [False] * (n + 2)
            seen[nums[i]] = True
            cur = 0
            for j in range(i + 1, n):
                v = nums[j]
                if not seen[v]:
                    lo = seen[v - 1]
                    hi = seen[v + 1]
                    if lo and hi:
                        cur -= 1
                    elif not lo and not hi:
                        cur += 1
                    seen[v] = True
                total += cur
        return total
