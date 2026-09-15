from typing import List


class Solution:
    def boxDelivering(self, boxes: List[List[int]], portsCount: int, maxBoxes: int, maxWeight: int) -> int:
        """Boxes are delivered in order, so every voyage carries a
        contiguous stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]:
        one trip per port change inside the stretch, plus the first port
        and the return to storage (runs counts port changes before each
        index). Pulling the i-dependent part out of dp[i]'s window minimum
        leaves key[l] = dp[l] - runs[l+1], so a monotonic queue of l
        values keyed by key answers each DP step in constant time while
        the weight and box limits slide the window forward.
        """
        n = len(boxes)
        weight_prefix = [0] * (n + 1)
        runs = [0] * (n + 1)  # port changes strictly inside the first m boxes
        for i, (port, weight) in enumerate(boxes):
            weight_prefix[i + 1] = weight_prefix[i] + weight
            runs[i + 1] = runs[i] + (i > 0 and boxes[i - 1][0] != port)
        dp = [0] * (n + 1)
        key = [0] * n  # key[l] = dp[l] - runs[l + 1], the part of the cost l alone decides
        window = []  # candidate l values with strictly increasing keys
        head = 0
        lightest = 0  # smallest l whose loaded weight still fits maxWeight
        for i in range(1, n + 1):
            fresh = i - 1
            key[fresh] = dp[fresh] - runs[i]
            while len(window) > head and key[window[-1]] >= key[fresh]:
                window.pop()
            window.append(fresh)
            # weights are positive, so this floor only moves forward
            while weight_prefix[i] - weight_prefix[lightest] > maxWeight:
                lightest += 1
            low = lightest if lightest > i - maxBoxes else i - maxBoxes
            while window[head] < low:
                head += 1
            dp[i] = 2 + runs[i] + key[window[head]]
        return dp[n]
