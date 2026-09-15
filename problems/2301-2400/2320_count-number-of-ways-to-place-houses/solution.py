class Solution:
    def countHousePlacements(self, n: int) -> int:
        MOD = 10**9 + 7
        prev, curr = 1, 2  # f(0), f(1): placements along one side
        for _ in range(n - 1):
            prev, curr = curr, (prev + curr) % MOD
        return curr * curr % MOD
