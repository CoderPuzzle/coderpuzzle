from typing import List


class Solution:
    def xorAfterQueries(self, nums: List[int], queries: List[List[int]]) -> int:
        # Strides above sqrt(n) visit fewer than sqrt(n) + 1 positions each
        # and are applied literally; strides at or below it share residue-
        # class buckets, each applied in one prefix-product sweep.
        n = len(nums)
        b = 1
        while (b + 1) * (b + 1) <= n:
            b += 1
        mod = 1000000007
        buckets = {}
        for l, r, k, v in queries:
            if k > b:
                for idx in range(l, r + 1, k):
                    nums[idx] = nums[idx] * v % mod
                continue
            c = l % k
            key = k * (b + 1) + c
            bucket = buckets.get(key)
            if bucket is None:
                bucket = buckets[key] = []
            # Coordinate events: the multiplier starts at l's coordinate and
            # stops just past the last visited coordinate of the walk.
            bucket.append((l // k, v))
            bucket.append(((r - c) // k + 1, pow(v, mod - 2, mod)))
        for key, events in buckets.items():
            k, c = divmod(key, b + 1)
            events.sort()
            span = (n - 1 - c) // k + 1
            acc = 1
            prev = 0
            i = 0
            total = len(events)
            while i < total:
                pos = events[i][0]
                if acc != 1 and pos > prev:
                    for idx in range(c + prev * k, c + pos * k, k):
                        nums[idx] = nums[idx] * acc % mod
                d = 1
                while i < total and events[i][0] == pos:
                    d = d * events[i][1] % mod
                    i += 1
                acc = acc * d % mod
                prev = pos
            if acc != 1 and span > prev:
                for idx in range(c + prev * k, c + span * k, k):
                    nums[idx] = nums[idx] * acc % mod
        x = 0
        for value in nums:
            x ^= value
        return x
