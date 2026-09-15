from typing import List, Optional


class Solution:
    def maxProfit(self, workers: List[int], tasks: List[List[int]]) -> int:
        # Skills partition the problem: inside one skill class every
        # worker is interchangeable and can take any task of that class,
        # so the k workers of a skill simply claim its k most profitable
        # tasks. The extra worker then claims the best leftover overall.
        counts = {}
        for w in workers:
            counts[w] = counts.get(w, 0) + 1
        groups = {}
        for req, profit in tasks:
            groups.setdefault(req, []).append(profit)
        total = 0
        best_extra = 0
        for skill, profits in groups.items():
            profits.sort(reverse=True)
            take = min(counts.get(skill, 0), len(profits))
            total += sum(profits[:take])
            if take < len(profits) and profits[take] > best_extra:
                best_extra = profits[take]
        return total + best_extra
