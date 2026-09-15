import heapq
from typing import List


class Solution:
    def modeWeight(self, nums: List[int], k: int) -> int:
        # cnt holds each value's frequency inside the window; bucket[f]
        # counts how many distinct values sit at frequency f, so the top
        # frequency tracks entries and exits in O(1). Heap entries are
        # (-frequency, value) pairs, so the heap top is the smallest value
        # of the top frequency; stale entries (their recorded frequency has
        # since moved) are skimmed off when they reach the top — every
        # revisit of a state pushes a fresh copy, so discarding them early
        # is safe. Weights reach 10^10 and the total 2.5 * 10^14.
        cnt = {}
        bucket = {}
        heap = []
        top_freq = 0
        total = 0
        for right, value in enumerate(nums):
            # Enter: lift the arriving value one frequency up.
            count = cnt.get(value, 0) + 1
            cnt[value] = count
            bucket[count] = bucket.get(count, 0) + 1
            if count > 1:
                bucket[count - 1] -= 1
            if count > top_freq:
                top_freq = count
            heapq.heappush(heap, (-count, value))
            if right >= k:
                # Leave: drop the exiting value one frequency down; only a
                # one-step fall of the top frequency is ever possible.
                leaving = nums[right - k]
                count = cnt[leaving] - 1
                cnt[leaving] = count
                bucket[count + 1] -= 1
                if count > 0:
                    bucket[count] = bucket.get(count, 0) + 1
                    heapq.heappush(heap, (-count, leaving))
                if bucket.get(top_freq, 0) == 0:
                    top_freq -= 1
            if right >= k - 1:
                # Skim stale tops, then score mode * top frequency.
                while cnt[heap[0][1]] != -heap[0][0]:
                    heapq.heappop(heap)
                total += heap[0][1] * top_freq
        return total
