from collections import deque
from typing import Deque, List


class Solution:
    def kEmptySlots(self, bulbs: List[int], k: int) -> int:
        # Invert to days: days[p] is the turn on which position p lights. A
        # window (i, i+k+1) qualifies exactly when both endpoints light
        # before every interior position, and it qualifies on the day
        # max(days[i], days[i+k+1]); the answer is the minimum such day.
        n = len(bulbs)
        if n < k + 2:
            return -1
        days = [0] * n
        for day, position in enumerate(bulbs, 1):
            days[position - 1] = day
        best = -1
        window: Deque[int] = deque()
        # The interior [right-k, right-1] slides one position at a time; the
        # deque keeps indices of strictly increasing day values, so its front
        # is always the interior minimum.
        for index in range(1, k):
            while window and days[window[-1]] >= days[index]:
                window.pop()
            window.append(index)
        for right in range(k + 1, n):
            entering = right - 1
            while window and days[window[-1]] >= days[entering]:
                window.pop()
            window.append(entering)
            while window and window[0] < right - k:
                window.popleft()
            pair_day = max(days[right - k - 1], days[right])
            if (k == 0 or days[window[0]] > pair_day) and (best == -1 or pair_day < best):
                best = pair_day
        return best
