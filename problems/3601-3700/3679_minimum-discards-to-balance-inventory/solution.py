from typing import List


class Solution:
    def minArrivalsToDiscard(self, arrivals: List[int], w: int, m: int) -> int:
        # cnt[type] holds how many kept arrivals of that type sit inside the
        # current w-day window; kept[i] records whether day i was kept, since
        # a discarded arrival never entered the counts and must not be
        # decremented when its day slides out of the window.
        cnt = {}
        kept = [False] * len(arrivals)
        discards = 0
        for i, arrival in enumerate(arrivals):
            if i >= w and kept[i - w]:
                cnt[arrivals[i - w]] -= 1
            count = cnt.get(arrival, 0)
            if count == m:
                discards += 1
            else:
                kept[i] = True
                cnt[arrival] = count + 1
        return discards
