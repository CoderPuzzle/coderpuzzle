from typing import List, Optional


class Solution:
    def findMaxSum(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        import heapq

        n = len(nums1)
        # sweep indices by increasing nums1: each query pools the strictly smaller values
        indices = sorted(range(n), key=lambda i: nums1[i])
        heap = []
        total = 0
        result = [0] * n
        i = 0
        while i < n:
            j = i
            while j < n and nums1[indices[j]] == nums1[indices[i]]:
                j += 1
            # strict <: the equal-value block is answered before its own values join
            for t in range(i, j):
                result[indices[t]] = total
            # pool invariant: the heap holds the top-k nums2 so far, total their sum
            for t in range(i, j):
                # evict the current minimum only when the newcomer beats it
                val = nums2[indices[t]]
                if len(heap) < k:
                    heapq.heappush(heap, val)
                    total += val
                elif val > heap[0]:
                    total += val - heapq.heapreplace(heap, val)
            i = j
        return result
