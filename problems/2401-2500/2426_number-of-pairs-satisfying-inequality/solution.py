from typing import List, Optional


class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], diff: int) -> int:
        values = [x - y for x, y in zip(nums1, nums2)]
        lo = min(values)
        hi = max(values)
        size = hi - lo + 1
        tree = [0] * (size + 1)

        def update(value):
            index = value - lo + 1
            while index <= size:
                tree[index] += 1
                index += index & -index

        def query(value):
            # count of inserted values <= value
            index = min(value, hi) - lo + 1
            total = 0
            while index > 0:
                total += tree[index]
                index -= index & -index
            return total

        count = 0
        for value in values:
            target = value + diff
            if target >= lo:
                count += query(target)
            update(value)
        return count
