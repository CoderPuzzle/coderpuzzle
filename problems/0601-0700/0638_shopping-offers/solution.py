from typing import Dict, List, Tuple


class Solution:
    def shoppingOffers(self, price: List[int], special: List[List[int]], needs: List[int]) -> int:
        # Memoized DFS over the remaining-needs vector. Every state offers
        # the same two move kinds: buy one unit of any still-wanted item at
        # its list price, or apply any special offer that fits inside the
        # state — the fit check is what forbids buying more than wanted.
        n = len(price)
        memo: Dict[Tuple[int, ...], int] = {}

        def dfs(cur: List[int]) -> int:
            if not any(cur):
                return 0
            key = tuple(cur)
            if key in memo:
                return memo[key]
            best = float("inf")
            # Move kind 1: one unit of item i, bought individually.
            for i in range(n):
                if cur[i]:
                    cur[i] -= 1
                    best = min(best, price[i] + dfs(cur))
                    cur[i] += 1
            # Move kind 2: a special offer, when it fits within cur.
            for offer in special:
                if all(offer[j] <= cur[j] for j in range(n)):
                    for j in range(n):
                        cur[j] -= offer[j]
                    best = min(best, offer[n] + dfs(cur))
                    for j in range(n):
                        cur[j] += offer[j]
            memo[key] = best
            return best

        return dfs(list(needs))
