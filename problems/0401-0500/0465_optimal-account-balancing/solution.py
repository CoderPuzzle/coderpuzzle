from typing import List, Optional


class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        balance = {}
        for frm, to, amount in transactions:
            balance[frm] = balance.get(frm, 0) - amount
            balance[to] = balance.get(to, 0) + amount
        # Only nonzero net balances matter: any zero-sum group of s people
        # settles in s-1 transfers, so maximizing the group count g of a
        # partition minimizes the total n - g.
        debts = [v for v in balance.values() if v != 0]
        n = len(debts)
        if n == 0:
            return 0

        total = 1 << n
        # Subset sums built incrementally via the lowest set bit; valid marks
        # zero-sum subsets, the candidate groups.
        sums = [0] * total
        valid = [False] * total
        for mask in range(1, total):
            lsb = mask & -mask
            bit = lsb.bit_length() - 1
            sums[mask] = sums[mask ^ lsb] + debts[bit]
            valid[mask] = sums[mask] == 0

        # dp[mask] = most disjoint valid groups partitioning mask; the -1e9
        # sentinel means "not exactly partitionable", so only full covers add.
        dp = [-(10**9)] * total
        dp[0] = 0
        for mask in range(1, total):
            sub = mask
            while sub:
                if valid[sub] and dp[mask ^ sub] != -(10**9):
                    dp[mask] = max(dp[mask], dp[mask ^ sub] + 1)
                sub = (sub - 1) & mask
        # Fewest transactions = n balances minus the best group count.
        return n - dp[total - 1]
