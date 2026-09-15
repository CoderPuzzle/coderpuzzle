from typing import List


class Solution:
    def findMinMoves(self, machines: List[int]) -> int:
        # A move passes dresses around but creates none, so equalizing first
        # requires total % n == 0. Afterwards the answer is the largest of
        # two one-per-move bottlenecks: the net dresses forced across any
        # one boundary, and any single machine's excess — a machine gives
        # away one dress per move even when both neighbors are short.
        total = sum(machines)
        count = len(machines)
        if total % count != 0:
            return -1
        average = total // count
        moves = 0
        crossing = 0
        for dresses in machines:
            # `crossing` is the traffic the boundary on this machine's right
            # must carry: the left block's surplus, forced in any schedule.
            crossing += dresses - average
            moves = max(moves, abs(crossing), dresses - average)
        return moves
