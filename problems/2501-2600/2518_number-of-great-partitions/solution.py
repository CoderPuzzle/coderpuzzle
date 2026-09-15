from typing import List


class Solution:
    def countPartitions(self, nums: List[int], k: int) -> int:
        # Reverse view per the hint: a partition fails when either group's
        # sum lands under k, and both failures coincide only if the total
        # is under 2*k -- then zero great partitions exist outright.
        # Otherwise every subset with sum < k names one failure per side,
        # so the answer is 2^n minus twice their count.
        MOD = 10**9 + 7
        if sum(nums) < 2 * k:
            return 0
        # ways[s] holds, mod p, how many subsets of the processed prefix
        # sum to s; rows at k and beyond can never come back below k.
        ways = [1] + [0] * (k - 1)
        for value in nums:
            for s in range(k - 1, value - 1, -1):
                ways[s] = (ways[s] + ways[s - value]) % MOD
        below = sum(ways) % MOD
        power = pow(2, len(nums), MOD)
        return (power - 2 * below) % MOD
