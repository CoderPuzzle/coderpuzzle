from typing import List, Optional
import heapq


class Solution:
    def eatenApples(self, apples: List[int], days: List[int]) -> int:
        n = len(apples)
        heap = []
        eaten = 0
        # Greedy: always eat from the soonest-rotting batch. Exchange argument
        # — swapping a later-rotting apple for an earlier-rotting one never
        # reduces the total — so a min-heap keyed by rot day is optimal.
        for i in range(n):
            if apples[i] > 0:
                heapq.heappush(heap, (i + days[i], apples[i]))
            # Purge batches whose rot day has arrived (inedible from day
            # i + days[i] on).
            while heap and heap[0][0] <= i:
                heapq.heappop(heap)
            # Eat from the front batch; push it back minus one if any remain.
            if heap:
                rot_day, count = heapq.heappop(heap)
                eaten += 1
                if count > 1:
                    heapq.heappush(heap, (rot_day, count - 1))
        # After day n no new apples appear: keep purging and eating one apple
        # per day until every batch has rotted or been eaten.
        day = n
        while heap:
            while heap and heap[0][0] <= day:
                heapq.heappop(heap)
            if not heap:
                break
            rot_day, count = heapq.heappop(heap)
            eaten += 1
            if count > 1:
                heapq.heappush(heap, (rot_day, count - 1))
            day += 1
        return eaten
