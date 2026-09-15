class Solution:
    def minimumCost(self, nums: list[int], k: int) -> int:
        mod = 1_000_000_007
        count = max(0, (sum(nums) + k - 1) // k - 1)
        return (count % mod) * ((count + 1) % mod) * pow(2, mod - 2, mod) % mod
