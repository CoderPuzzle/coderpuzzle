from typing import List


class Solution:
    def maxProfit(self, prices: List[int], profits: List[int]) -> int:
        # Fix the middle item j. Two Fenwick (binary indexed) trees over the
        # compressed price ranks answer, for every j, the maximum profit
        # among earlier items priced strictly below prices[j] and among
        # later items priced strictly above prices[j]; the right pass runs
        # the same prefix queries over reversed ranks. Every profit is >= 1,
        # so a query result of 0 means "no such item exists".
        n = len(prices)
        ranks = sorted(set(prices))
        m = len(ranks)
        rank = {p: i + 1 for i, p in enumerate(ranks)}

        def query(tree: List[int], i: int) -> int:
            best = 0
            while i > 0:
                if tree[i] > best:
                    best = tree[i]
                i -= i & -i
            return best

        def update(tree: List[int], i: int, gain: int) -> None:
            while i <= m:
                if gain > tree[i]:
                    tree[i] = gain
                i += i & -i

        left = [0] * n
        tree = [0] * (m + 1)
        for j in range(n):
            r = rank[prices[j]]
            left[j] = query(tree, r - 1)
            update(tree, r, profits[j])

        right = [0] * n
        tree = [0] * (m + 1)
        for j in range(n - 1, -1, -1):
            r = m + 1 - rank[prices[j]]
            right[j] = query(tree, r - 1)
            update(tree, r, profits[j])

        best = -1
        for j in range(n):
            if left[j] > 0 and right[j] > 0:
                total = left[j] + profits[j] + right[j]
                if total > best:
                    best = total
        return best
