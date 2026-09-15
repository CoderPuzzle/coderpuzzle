class Solution:
    def maxSum(self, grid: List[List[int]], limits: List[int], k: int) -> int:
        # Every value is non-negative, so an optimal selection can be found
        # among each row's top limits[i] values: pool those candidates, sort
        # descending, and sum the first k. The sum may reach
        # 250000 * 10^5 = 2.5e10, beyond 32 bits but native for Python ints.
        pool = []
        for row, cap in zip(grid, limits):
            pool.extend(sorted(row, reverse=True)[:cap])
        pool.sort(reverse=True)
        return sum(pool[:k])
