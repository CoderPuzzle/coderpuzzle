class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        # cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose
        # sum stays at most maxCost. A sliding window keeps one pass.
        costs = [abs(ord(a) - ord(b)) for a, b in zip(s, t)]
        left = 0
        window_cost = 0
        best = 0
        for right in range(len(costs)):
            window_cost += costs[right]
            # Non-negative costs: shrink from the left until affordable.
            while window_cost > maxCost:
                window_cost -= costs[left]
                left += 1
            best = max(best, right - left + 1)
        return best
