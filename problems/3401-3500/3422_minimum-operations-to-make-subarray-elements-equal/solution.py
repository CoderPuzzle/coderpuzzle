import heapq
from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # Equalizing a window costs sum(|x - t|), minimized when t is a
        # median. Slide the window over two heap halves around the median;
        # running half-sums make each window's cost O(1). Every element
        # packs to the unique key (v + 2^20) << 17 | index, so keys never
        # tie, max(low) < min(high) strictly, and a leaving element routes
        # to its true half by one comparison -- deletion can then be lazy,
        # dropping stale copies only when they surface at a heap top.
        n = len(nums)
        low = []  # max-heap via negation: lower half of the window
        high = []  # min-heap: upper half of the window
        delayed = [0] * n  # pending physical removals, by index
        low_size = high_size = 0
        low_sum = high_sum = 0

        def prune_low():
            while low and delayed[-low[0] & 131071]:
                delayed[-low[0] & 131071] -= 1
                heapq.heappop(low)

        def prune_high():
            while high and delayed[high[0] & 131071]:
                delayed[high[0] & 131071] -= 1
                heapq.heappop(high)

        for i in range(k):
            key = ((nums[i] + 1048576) << 17) | i
            if low_size == 0 or key <= -low[0]:
                heapq.heappush(low, -key)
                low_size += 1
                low_sum += nums[i]
            else:
                heapq.heappush(high, key)
                high_size += 1
                high_sum += nums[i]
            if low_size > high_size + 1:
                prune_low()
                move = -heapq.heappop(low)
                low_size -= 1
                low_sum -= (move >> 17) - 1048576
                heapq.heappush(high, move)
                high_size += 1
                high_sum += (move >> 17) - 1048576
            elif low_size < high_size:
                prune_high()
                move = heapq.heappop(high)
                high_size -= 1
                high_sum -= (move >> 17) - 1048576
                heapq.heappush(low, -move)
                low_size += 1
                low_sum += (move >> 17) - 1048576

        prune_low()
        prune_high()
        median = (-low[0] >> 17) - 1048576
        best = (median * low_size - low_sum) + (high_sum - median * high_size)

        for i in range(k, n):
            out_key = ((nums[i - k] + 1048576) << 17) | (i - k)
            delayed[i - k] = 1
            if out_key <= -low[0]:
                low_size -= 1
                low_sum -= nums[i - k]
            else:
                high_size -= 1
                high_sum -= nums[i - k]
            key = ((nums[i] + 1048576) << 17) | i
            if key <= -low[0]:
                heapq.heappush(low, -key)
                low_size += 1
                low_sum += nums[i]
            else:
                heapq.heappush(high, key)
                high_size += 1
                high_sum += nums[i]
            if low_size > high_size + 1:
                prune_low()
                move = -heapq.heappop(low)
                low_size -= 1
                low_sum -= (move >> 17) - 1048576
                heapq.heappush(high, move)
                high_size += 1
                high_sum += (move >> 17) - 1048576
            elif low_size < high_size:
                prune_high()
                move = heapq.heappop(high)
                high_size -= 1
                high_sum -= (move >> 17) - 1048576
                heapq.heappush(low, -move)
                low_size += 1
                low_sum += (move >> 17) - 1048576
            prune_low()
            prune_high()
            median = (-low[0] >> 17) - 1048576
            cost = (median * low_size - low_sum) + (high_sum - median * high_size)
            if cost < best:
                best = cost
        return best
