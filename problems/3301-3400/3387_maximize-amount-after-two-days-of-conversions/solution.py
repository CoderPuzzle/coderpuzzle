from collections import deque
from typing import List


class Solution:
    def maxAmount(
        self,
        initialCurrency: str,
        pairs1: List[List[str]],
        rates1: List[float],
        pairs2: List[List[str]],
        rates2: List[float],
    ) -> float:
        # Day 1 ends holding some intermediate currency c, and day 2
        # converts c back to initialCurrency. Rates are consistent (no
        # contradictions), so the first BFS visit to a currency already
        # carries its maximum amount: day 1 is one BFS from initialCurrency
        # (forward edges multiply by the rate, reverse edges divide by it),
        # and day 2 reruns the same BFS from every currency reached on
        # day 1, carrying that currency's amount. The answer is the
        # largest amount of initialCurrency any of those searches ends
        # with.
        def build(pairs, rates):
            graph = {}
            for (start, target), rate in zip(pairs, rates):
                # Forward edge multiplies; its paired reverse divides.
                graph.setdefault(start, []).append((target, rate, True))
                graph.setdefault(target, []).append((start, rate, False))
            return graph

        def spread(graph, source, start_amount):
            # First-visit amount of every currency reachable from source.
            amounts = {source: start_amount}
            order = [source]
            queue = deque(order)
            while queue:
                currency = queue.popleft()
                for target, rate, forward in graph.get(currency, ()):
                    if target in amounts:
                        continue
                    amount = amounts[currency]
                    amounts[target] = amount * rate if forward else amount / rate
                    order.append(target)
                    queue.append(target)
            return order, amounts

        visited, day1 = spread(build(pairs1, rates1), initialCurrency, 1.0)
        day2 = build(pairs2, rates2)
        best = 0.0
        for currency in visited:
            # Unreachable initialCurrency simply offers no candidate.
            best = max(best, spread(day2, currency, day1[currency])[1].get(initialCurrency, 0.0))
        return best
