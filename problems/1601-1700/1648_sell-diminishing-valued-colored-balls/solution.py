from typing import List, Optional


class Solution:
    def maxProfit(self, inventory: List[int], orders: int) -> int:
        MOD = 10**9 + 7
        inv = sorted(inventory, reverse=True)
        inv.append(0)  # sentinel
        total = 0
        remaining = orders
        i = 0
        n = len(inv)
        while remaining > 0 and i < n - 1:
            while i + 1 < n - 1 and inv[i + 1] == inv[i]:
                i += 1
            h = inv[i]
            low = inv[i + 1]  # next distinct level (or 0 sentinel)
            width = i + 1  # colors currently at level h or above
            band = width * (h - low)  # balls in the full band (low, h]
            if remaining >= band:
                # sell every ball valued low+1 .. h for each of the width colors
                total += width * (h + low + 1) * (h - low) // 2
                remaining -= band
                i += 1
            else:
                full, rem = divmod(remaining, width)
                top = h
                bottom = h - full + 1
                total += width * (top + bottom) * full // 2
                total += rem * (h - full)
                remaining = 0
        return total % MOD
