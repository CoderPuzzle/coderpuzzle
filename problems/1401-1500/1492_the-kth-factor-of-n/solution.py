from typing import List


class Solution:
    def kthFactor(self, n: int, k: int) -> int:
        small: List[int] = []
        i = 1
        while i * i <= n:
            if n % i == 0:
                small.append(i)
                if len(small) == k:
                    return i
            i += 1
        count = len(small)
        if n % (i - 1) == 0 and (i - 1) * (i - 1) == n:
            # perfect square: the root was counted once
            total = 2 * count - 1
        else:
            total = 2 * count
        if k > total:
            return -1
        return n // small[total - k]
