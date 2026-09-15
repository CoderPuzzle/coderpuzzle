class Solution:
    def minCuttingCost(self, n: int, m: int, k: int) -> int:
        # n, m <= 2k and transport is always possible, so at most one log
        # exceeds k; each such log must be cut once, and both pieces must
        # fit a truck (<= k). The split a + (L - a) with a in [L-k, k]
        # minimizes the product a * (L - a) at the ends of that range,
        # giving k * (L - k). Logs of length <= k ride for free.
        cost = 0
        for log in (n, m):
            if log > k:
                cost += k * (log - k)
        return cost
