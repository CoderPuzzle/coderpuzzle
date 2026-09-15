import heapq
from typing import List


class Solution:
    def maxRemoval(self, nums: List[int], queries: List[List[int]]) -> int:
        # Sweep indices left to right with the queries sorted by start;
        # a max-heap by right endpoint holds the queries covering the
        # current index. Whenever the running coverage of already
        # selected queries falls short of nums[i], select the query
        # reaching farthest right — the exchange argument makes that
        # safe — and retire its coverage one step past r via a
        # difference array. Return -1 when the heap runs dry on a
        # deficit; the answer is all queries minus the selected few.
        queries.sort(key=lambda q: q[0])
        heap = []
        delta = [0] * (len(nums) + 1)
        cover = 0
        selected = 0
        j = 0
        for i, need in enumerate(nums):
            cover += delta[i]
            while j < len(queries) and queries[j][0] <= i:
                heapq.heappush(heap, -queries[j][1])
                j += 1
            while cover < need:
                while heap and -heap[0] < i:
                    heapq.heappop(heap)
                if not heap:
                    return -1
                r = -heapq.heappop(heap)
                cover += 1
                delta[r + 1] -= 1
                selected += 1
        return len(queries) - selected
