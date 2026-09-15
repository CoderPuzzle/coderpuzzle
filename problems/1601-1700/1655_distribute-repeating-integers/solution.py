from typing import List, Optional


class Solution:
    def canDistribute(self, nums: List[int], quantity: List[int]) -> bool:
        # A customer's integers must all be equal, so each customer draws
        # from a single value — and a value with count c serves any group
        # of customers whose quantities sum to at most c, with several
        # customers free to share one value. Only the counts matter, m is
        # at most 10, and there are at most 50 distinct values, so a
        # subset DP over customer bitmasks, one frequency value at a
        # time, covers every distribution.
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        m = len(quantity)
        full = (1 << m) - 1
        # subset_sums[mask] = total amount ordered by the customers in mask.
        subset_sums = [0] * (1 << m)
        for mask in range(1, 1 << m):
            low = mask & -mask
            subset_sums[mask] = subset_sums[mask ^ low] + quantity[low.bit_length() - 1]
        # reachable[mask]: the customers in mask are served by the values
        # processed so far. Each value either stays unused (the previous
        # layer carries over) or takes one submask of the still-unsatisfied
        # customers whose quantity sum fits within its count.
        reachable = [False] * (1 << m)
        reachable[0] = True
        for count in counts.values():
            nxt = reachable[:]
            for mask in range(1 << m):
                if not reachable[mask]:
                    continue
                available = full ^ mask
                submask = available
                while submask:
                    if subset_sums[submask] <= count:
                        nxt[mask | submask] = True
                    submask = (submask - 1) & available
            reachable = nxt
        return reachable[full]
