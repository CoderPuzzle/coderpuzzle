import heapq


class Solution:
    def maximumProduct(self, nums: List[int], k: int) -> int:
        heap = list(nums)
        heapq.heapify(heap)
        for _ in range(k):
            smallest = heap[0]
            heapq.heapreplace(heap, smallest + 1)
        product = 1
        for value in heap:
            product = product * value % 1_000_000_007
        return product
