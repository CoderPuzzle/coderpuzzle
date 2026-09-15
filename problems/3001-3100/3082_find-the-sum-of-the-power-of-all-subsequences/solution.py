from typing import List


class Solution:
    def sumOfPower(self, nums: List[int], k: int) -> int:
        # A subsequence T with sum k and length j is contained in exactly
        # 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
        # where count[j][s] counts length-j subsequences of sum s — a 0/1
        # knapsack filled with j and s both descending. Elements above k can
        # never join a sum-k subsequence, so they are skipped outright.
        MOD = 1_000_000_007
        n = len(nums)
        counts = [[0] * (k + 1) for _ in range(n + 1)]
        counts[0][0] = 1
        used = 0
        for num in nums:
            if num > k:
                continue
            used += 1
            for j in range(used, 0, -1):
                row = counts[j]
                prior = counts[j - 1]
                for s in range(k, num - 1, -1):
                    row[s] = (row[s] + prior[s - num]) % MOD
        power = 1
        total = 0
        for j in range(n, 0, -1):
            total = (total + counts[j][k] * power) % MOD
            power = power * 2 % MOD
        return total
