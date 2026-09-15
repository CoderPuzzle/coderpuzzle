import heapq
from typing import List


class Solution:
    def findXSum(self, nums: List[int], k: int, x: int) -> List[int]:
        # TOP is a min-heap and REST a max-heap of (count, value)
        # snapshots of the live distinct values: TOP's peek is the worst
        # kept pair, REST's peek the best dropped one. Each slide moves at
        # most two pairs between the heaps, and `total` follows every
        # membership change, so one O(n log n) pass answers every window;
        # stale snapshots are skipped on peek and popped when surfaced.
        TOP, REST = 0, 1
        freq = {}
        top_heap = []
        rest_heap = []  # (-count, -value): min-heap == max-heap on (count, value)
        membership = {}  # (count, value) -> TOP | REST
        state = {"top_size": 0, "total": 0}
        answer: List[int] = []

        def peek_top():
            while top_heap:
                p = top_heap[0]
                if freq.get(p[1], 0) == p[0] and membership.get(p) == TOP:
                    return p
                heapq.heappop(top_heap)
            return None

        def peek_rest():
            while rest_heap:
                q = rest_heap[0]
                p = (-q[0], -q[1])
                if freq.get(p[1], 0) == p[0] and membership.get(p) == REST:
                    return p
                heapq.heappop(rest_heap)
            return None

        def erase(count, value):
            if membership.pop((count, value)) == TOP:
                state["top_size"] -= 1
                state["total"] -= count * value
                # refill from the best of rest
                while state["top_size"] < x:
                    p = peek_rest()
                    if p is None:
                        break
                    heapq.heappop(rest_heap)
                    membership[p] = TOP
                    heapq.heappush(top_heap, p)
                    state["top_size"] += 1
                    state["total"] += p[0] * p[1]

        def place(count, value):
            p = (count, value)
            if state["top_size"] < x:
                membership[p] = TOP
                heapq.heappush(top_heap, p)
                state["top_size"] += 1
                state["total"] += count * value
                return
            worst = peek_top()
            if p > worst:
                # the newcomer beats the worst kept pair: swap them
                membership[worst] = REST
                heapq.heappush(rest_heap, (-worst[0], -worst[1]))
                state["total"] -= worst[0] * worst[1]
                state["top_size"] -= 1
                membership[p] = TOP
                heapq.heappush(top_heap, p)
                state["top_size"] += 1
                state["total"] += count * value
            else:
                membership[p] = REST
                heapq.heappush(rest_heap, (-count, -value))

        for i, value in enumerate(nums):
            count = freq.get(value, 0)
            if count:
                erase(count, value)
            freq[value] = count + 1
            place(count + 1, value)
            if i >= k:
                leaving = nums[i - k]
                old = freq[leaving]
                erase(old, leaving)
                old -= 1
                freq[leaving] = old
                if old:
                    # a count that just reached 0 leaves no pair behind
                    place(old, leaving)
            if i >= k - 1:
                answer.append(state["total"])
        return answer
