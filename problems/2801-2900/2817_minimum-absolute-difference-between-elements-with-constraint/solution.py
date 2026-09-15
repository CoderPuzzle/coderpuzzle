from typing import List


class Solution:
    def minAbsoluteDifference(self, nums: List[int], x: int) -> int:
        # A pair consists of two distinct indices, so x == 0 still demands a
        # separation of at least one index step.
        separation = x if x >= 1 else 1
        vals = sorted(set(nums))
        m = len(vals)
        rank: dict[int, int] = {}
        for i, v in enumerate(vals):
            rank[v] = i + 1
        tree = [0] * (m + 1)
        top = 1
        while top * 2 <= m:
            top *= 2
        answer = -1
        for j in range(len(nums)):
            if j >= separation:
                # Partner nums[j - separation] enters the eligible prefix
                # before nums[j] queries it.
                i = rank[nums[j - separation]]
                while i <= m:
                    tree[i] += 1
                    i += i & (-i)
                value = nums[j]
                count = 0
                i = rank[value]
                while i > 0:
                    count += tree[i]
                    i -= i & (-i)
                have = j - separation + 1
                if count > 0:
                    pos = 0
                    rem = count
                    step = top
                    while step > 0:
                        nxt = pos + step
                        if nxt <= m and tree[nxt] < rem:
                            pos = nxt
                            rem -= tree[nxt]
                        step >>= 1
                    difference = value - vals[pos]
                    if answer < 0 or difference < answer:
                        answer = difference
                if have > count:
                    pos = 0
                    rem = count + 1
                    step = top
                    while step > 0:
                        nxt = pos + step
                        if nxt <= m and tree[nxt] < rem:
                            pos = nxt
                            rem -= tree[nxt]
                        step >>= 1
                    difference = vals[pos] - value
                    if answer < 0 or difference < answer:
                        answer = difference
        return answer
