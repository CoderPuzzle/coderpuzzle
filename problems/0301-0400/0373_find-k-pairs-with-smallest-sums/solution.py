from typing import List, Optional
import heapq


class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        if not nums1 or not nums2 or k <= 0:
            return []
        result = []
        # Seed each active row's minimum (nums1[i], nums2[0]); rows past
        # min(len(nums1), k) can never reach the k smallest. Tuples compare
        # by sum, then i — the required tie-break (smaller nums1 index first).
        heap = [(nums1[i] + nums2[0], i, 0) for i in range(min(len(nums1), k))]
        heapq.heapify(heap)
        while heap and len(result) < k:
            _, i, j = heapq.heappop(heap)
            result.append([nums1[i], nums2[j]])
            # The popped pair's only unexplored successor in its row is
            # (i, j+1); pushing it keeps the heap holding the minimum of
            # every active row, so each pop yields the global minimum left.
            if j + 1 < len(nums2):
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        return result
