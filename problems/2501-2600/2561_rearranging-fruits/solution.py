from typing import List


class Solution:
    def minCost(self, basket1: List[int], basket2: List[int]) -> int:
        # A cost can only be balanced if its combined frequency across the
        # two baskets is even; an odd count makes equality impossible no
        # matter how fruits are swapped.
        diff = {}
        for x in basket1:
            diff[x] = diff.get(x, 0) + 1
        for x in basket2:
            diff[x] = diff.get(x, 0) - 1
        # Every |diff| / 2 surplus copies become relocation tickets. Real
        # swaps always pair one export with one import, so among all pooled
        # tickets only the cheapest half genuinely travels far. A ticket
        # costing more than twice the global minimum m is never paid
        # directly: shuttle m out and back around it and the same unit of
        # imbalance clears for a flat 2*m.
        tickets = []
        for value, delta in diff.items():
            if delta % 2 != 0:
                return -1
            tickets.extend([value] * (abs(delta) // 2))
        smallest = min(min(basket1), min(basket2))
        tickets.sort()
        # At most n tickets pay at most n * 2 * 10^9 <= 2*10^14 each run,
        # 64-bit territory in the static languages yet far below 2^53.
        return sum(min(t, 2 * smallest) for t in tickets[: len(tickets) // 2])
