from typing import List, Optional


class Solution:
    def minMoves(self, balance: List[int]) -> int:
        # At most one person is negative. With none, nobody moves; with a
        # negative total, no arrangement can work. Otherwise every unit a
        # giver releases costs one move per hop of its circular distance
        # to the negative index, so draining the deficit from the nearest
        # givers first — cheapest distance, then the next, and so on —
        # totals the minimum.
        n = len(balance)
        neg = -1
        for i, v in enumerate(balance):
            if v < 0:
                neg = i
                break
        if neg == -1:
            return 0
        if sum(balance) < 0:
            return -1
        need = -balance[neg]
        supplies = sorted(
            (min((i - neg) % n, (neg - i) % n), balance[i]) for i in range(n) if i != neg and balance[i] > 0
        )
        moves = 0
        for dist, amount in supplies:
            if need == 0:
                break
            take = min(amount, need)
            moves += take * dist
            need -= take
        return moves
