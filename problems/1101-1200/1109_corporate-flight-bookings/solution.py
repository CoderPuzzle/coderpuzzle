from typing import List, Optional


class Solution:
    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
        # difference array (n + 1 slots keeps the stamp at index last in
        # bounds when last == n): each booking costs two writes instead of
        # touching every flight in [first, last]
        diff = [0] * (n + 1)
        for first, last, seats in bookings:
            diff[first - 1] += seats
            # -seats one slot past the range end, so flight `last` still
            # sees the seats and every later flight does not
            diff[last] -= seats
        # one prefix sum over the stamps: each +/- pair cancels exactly
        # beyond its range, so the running total is each flight's occupancy
        answer = []
        running = 0
        for i in range(n):
            running += diff[i]
            answer.append(running)
        return answer
