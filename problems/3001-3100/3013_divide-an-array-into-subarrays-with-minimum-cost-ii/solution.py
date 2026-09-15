from typing import List, Optional


class _Fenwick:
    def __init__(self, size):
        self.n = size
        self.bit = [0] * (size + 1)

    def add(self, index, delta):
        i = index + 1
        while i <= self.n:
            self.bit[i] += delta
            i += i & -i

    def prefix(self, index):
        # sum over [0, index]; index may be < 0
        if index < 0:
            return 0
        if index >= self.n:
            index = self.n - 1
        i = index + 1
        total = 0
        while i > 0:
            total += self.bit[i]
            i -= i & -i
        return total


class Solution:
    def minimumCost(self, nums: List[int], k: int, dist: int) -> int:
        n = len(nums)
        target = k - 2
        vals = sorted(set(nums))
        m = len(vals)
        pos_of = {v: i for i, v in enumerate(vals)}

        count_bit = _Fenwick(m)
        sum_bit = _Fenwick(m)

        def kth(target_k):
            # 0-based index of the target_k-th smallest element (target_k >= 1)
            idx = 0
            bitmask = 1 << (m.bit_length() - 1)
            remaining = target_k
            while bitmask:
                nxt = idx + bitmask
                if nxt <= m and count_bit.bit[nxt] < remaining:
                    idx = nxt
                    remaining -= count_bit.bit[nxt]
                bitmask >>= 1
            return idx

        def sum_k_smallest(count):
            if count == 0:
                return 0
            idx = kth(count)
            before = count_bit.prefix(idx - 1)
            sum_before = sum_bit.prefix(idx - 1)
            return sum_before + (count - before) * vals[idx]

        def add_value(v):
            j = pos_of[v]
            count_bit.add(j, 1)
            sum_bit.add(j, v)

        def remove_value(v):
            j = pos_of[v]
            count_bit.add(j, -1)
            sum_bit.add(j, -v)

        right0 = min(1 + dist, n - 1)
        for p in range(2, right0 + 1):
            add_value(nums[p])

        ans = None
        for i1 in range(1, n):
            left = i1 + 1
            right = min(i1 + dist, n - 1)
            if right - left + 1 >= target:
                cost = nums[0] + nums[i1] + sum_k_smallest(target)
                if ans is None or cost < ans:
                    ans = cost
            if left <= n - 1:
                remove_value(nums[left])
            new_right = i1 + 1 + dist
            if new_right <= n - 1:
                add_value(nums[new_right])
        return ans
