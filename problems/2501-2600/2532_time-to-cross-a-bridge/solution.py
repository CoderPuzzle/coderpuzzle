from typing import List, Optional
import heapq


class Solution:
    def findCrossingTime(self, n: int, k: int, time: List[List[int]]) -> int:
        # Priority is static per worker: least efficient = larger left+right,
        # ties to the larger index. Encoded as min-key (-eff, -i).
        eff = [row[0] + row[2] for row in time]
        left = [(-eff[i], -i) for i in range(k)]
        heapq.heapify(left)
        right = []  # boxed workers waiting on the right bank
        pending = []  # (readyTime, join-side 1=right 0=left, i)
        cur = 0  # instant the bridge becomes free again
        sent = delivered = 0
        ans = 0
        while delivered < n:
            while pending and pending[0][0] <= cur:
                _, side, i = heapq.heappop(pending)
                heapq.heappush(right if side == 1 else left, (-eff[i], -i))
            if right:
                # A boxed worker on the right bank always has priority.
                _, ni = heapq.heappop(right)
                i = -ni
                cur += time[i][2]
                delivered += 1
                if cur > ans:
                    ans = cur  # the box reaches the left bank here
                if delivered == n:
                    break  # the final put never delays anything
                heapq.heappush(pending, (cur + time[i][3], 0, i))
            elif left and sent < n:
                _, ni = heapq.heappop(left)
                i = -ni
                cur += time[i][0]
                sent += 1
                heapq.heappush(pending, (cur + time[i][1], 1, i))
            else:
                # Nobody can cross yet: jump the clock to the next readiness.
                cur = pending[0][0]
        return ans
