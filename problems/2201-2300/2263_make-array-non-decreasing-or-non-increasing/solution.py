import heapq


class Solution:
    def convertArray(self, nums: List[int]) -> int:
        def non_decreasing_cost(values):
            # Slope trick: max-heap holds negated values.
            heap = []
            cost = 0
            for v in values:
                heapq.heappush(heap, -v)
                if -heap[0] > v:
                    cost += -heap[0] - v
                    heapq.heapreplace(heap, -v)
            return cost

        up = non_decreasing_cost(nums)
        down = non_decreasing_cost([-v for v in nums])
        return min(up, down)
