from typing import List, Optional


class Solution:
    def averageWaitingTime(self, customers: List[List[int]]) -> float:
        # Each customer's wait is settled the moment the previous order is
        # scheduled: the chef starts at max(free_at, arrival), finishes at
        # start + time, and the wait is finish - arrival. The arrivals are
        # sorted, so one forward sweep carrying the chef's free time
        # replays the whole day. The waits total as exact integers — the
        # deepest legal queue sums to about 5 * 10^13 — and the single
        # division at the end is the only floating-point step.
        total_waiting = 0
        free_at = 0
        for arrival, time in customers:
            start = max(free_at, arrival)
            free_at = start + time
            total_waiting += free_at - arrival
        return total_waiting / len(customers)
