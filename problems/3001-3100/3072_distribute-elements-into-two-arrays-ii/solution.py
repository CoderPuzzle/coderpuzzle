from typing import List, Optional


class Solution:
    def resultArray(self, nums: List[int]) -> List[int]:
        # Compress distinct values to 1-based ranks; trees count occurrences per rank.
        vals = sorted(set(nums))
        comp = {v: i + 1 for i, v in enumerate(vals)}
        size = len(vals)

        # Fenwick tree over ranks: point update, prefix-count query.
        class BIT:
            def __init__(self, n):
                self.n = n
                self.tree = [0] * (n + 1)

            def add(self, i, delta):
                while i <= self.n:
                    self.tree[i] += delta
                    i += i & -i

            def query(self, i):
                s = 0
                while i > 0:
                    s += self.tree[i]
                    i -= i & -i
                return s

        def greater_count(bit, length, x):
            # Prefix sum counts elements <= x; the rest are exactly the greater ones.
            idx = comp[x]
            le = bit.query(idx)
            return length - le

        # Seed both arrays and their trees with the first two elements.
        arr1 = [nums[0]]
        arr2 = [nums[1]]
        bit1 = BIT(size)
        bit2 = BIT(size)
        bit1.add(comp[nums[0]], 1)
        bit2.add(comp[nums[1]], 1)

        for x in nums[2:]:
            c1 = greater_count(bit1, len(arr1), x)
            c2 = greater_count(bit2, len(arr2), x)
            if c1 > c2:
                arr1.append(x)
                bit1.add(comp[x], 1)
            elif c1 < c2:
                arr2.append(x)
                bit2.add(comp[x], 1)
            else:
                # Equal counts: shorter array wins; ties on length go to arr1.
                if len(arr1) <= len(arr2):
                    arr1.append(x)
                    bit1.add(comp[x], 1)
                else:
                    arr2.append(x)
                    bit2.add(comp[x], 1)
        return arr1 + arr2
