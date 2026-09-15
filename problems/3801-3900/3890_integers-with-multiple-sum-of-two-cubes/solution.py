from typing import List


class Solution:
    def findGoodIntegers(self, n: int) -> List[int]:
        # The largest possible base is the integer cube root of n <= 10^9,
        # which is at most 1000.
        limit = 0
        while (limit + 1) ** 3 <= n:
            limit += 1
        cubes = [i**3 for i in range(limit + 1)]
        counts = {}
        for a in range(1, limit + 1):
            if cubes[a] + cubes[a] > n:
                break
            for b in range(a, limit + 1):
                total = cubes[a] + cubes[b]
                if total > n:
                    break
                counts[total] = counts.get(total, 0) + 1
        # A value is good when at least two distinct pairs form it.
        return sorted(x for x, c in counts.items() if c >= 2)
