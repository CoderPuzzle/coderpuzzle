from typing import List


class Solution:
    def maxProduct(self, nums: List[int], k: int, limit: int) -> int:
        # Per (parity, sum) we keep every reachable product <= limit, not
        # just the maximum: a larger product can blow past limit on a later
        # multiply while a smaller one survives. Product-0 reachability is
        # tracked separately, since a 0 can only be reached through a
        # subsequence containing a zero, even via products above the limit.
        total = sum(nums)
        if abs(k) > total:
            return -1
        width = 2 * total + 1
        products = [[set() for _ in range(width)] for _ in range(2)]
        zero = [[False] * width for _ in range(2)]
        reach = [[False] * width for _ in range(2)]
        for x in nums:
            np = [[set() for _ in range(width)] for _ in range(2)]
            nz = [[False] * width for _ in range(2)]
            nr = [[False] * width for _ in range(2)]
            # Skipping x keeps every current state.
            for p in (0, 1):
                for i in range(width):
                    if products[p][i]:
                        np[p][i] = set(products[p][i])
                    if zero[p][i]:
                        nz[p][i] = True
                    if reach[p][i]:
                        nr[p][i] = True
            # Taking x appends it to the subsequence; its sign follows the
            # parity of the current length (even -> +, odd -> -).
            for p in (0, 1):
                sign = 1 if p == 0 else -1
                q = 1 - p
                for i in range(width):
                    s = i - total
                    ns = s + sign * x
                    if ns < -total or ns > total:
                        continue
                    j = ns + total
                    if reach[p][i]:
                        nr[q][j] = True
                        if x == 0:
                            nz[q][i] = True
                        else:
                            for prod in products[p][i]:
                                newp = prod * x
                                if newp <= limit:
                                    np[q][j].add(newp)
                    if zero[p][i]:
                        nz[q][j] = True
            # A fresh subsequence with x as its single (even-index) element.
            if x == 0:
                nz[1][total] = True
                nr[1][total] = True
            else:
                nr[1][x + total] = True
                if x <= limit:
                    np[1][x + total].add(x)
            products, zero, reach = np, nz, nr
        ans = -1
        idx = k + total
        if 0 <= idx < width:
            for p in (0, 1):
                if products[p][idx]:
                    best = max(products[p][idx])
                    if best > ans:
                        ans = best
                if zero[p][idx] and ans < 0:
                    ans = 0
        return ans
