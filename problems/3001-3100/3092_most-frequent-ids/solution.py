import heapq
from typing import List


class Solution:
    def mostFrequentIDs(self, nums: List[int], freq: List[int]) -> List[int]:
        # Only one ID's count moves per step, so a lazy max-heap of (count,
        # id) snapshots answers "most frequent" without ever hunting down
        # the previous snapshot: push the touched ID's new count, then pop
        # entries whose count no longer matches the live table. A count can
        # reach 10^5 * 10^5 = 10^10, beyond 32 bits, so Python's ints carry
        # it.
        counts = {}
        heap = []
        answer = []
        for i in range(len(nums)):
            ident = nums[i]
            counts[ident] = counts.get(ident, 0) + freq[i]
            heapq.heappush(heap, (-counts[ident], ident))
            while -heap[0][0] != counts[heap[0][1]]:
                heapq.heappop(heap)
            answer.append(-heap[0][0])
        return answer
