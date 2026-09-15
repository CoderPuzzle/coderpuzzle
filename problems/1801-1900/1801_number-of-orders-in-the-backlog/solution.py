import heapq
from typing import List


class Solution:
    def getNumberOfBacklogOrders(self, orders: List[List[int]]) -> int:
        # Two heaps: sells as a min-heap on price, buys as a max-heap via
        # negated price. An incoming batch trades with the best-priced
        # opposing batch while the price condition holds; only its unmatched
        # remainder joins the backlog as one new batch.
        sells: List[List[int]] = []  # [price, amount], cheapest on top
        buys: List[List[int]] = []  # [-price, amount], priciest on top
        for price, amount, order_type in orders:
            if order_type == 0:
                while amount and sells and sells[0][0] <= price:
                    take = min(amount, sells[0][1])
                    amount -= take
                    sells[0][1] -= take
                    if sells[0][1] == 0:
                        heapq.heappop(sells)
                if amount:
                    heapq.heappush(buys, [-price, amount])
            else:
                while amount and buys and -buys[0][0] >= price:
                    take = min(amount, buys[0][1])
                    amount -= take
                    buys[0][1] -= take
                    if buys[0][1] == 0:
                        heapq.heappop(buys)
                if amount:
                    heapq.heappush(sells, [price, amount])
        # Totals reach 1e5 * 1e9 = 1e14, so the sum needs 64-bit range
        # (native in Python); the answer is reduced modulo 1e9 + 7.
        total = sum(a for _, a in sells) + sum(a for _, a in buys)
        return total % 1_000_000_007
