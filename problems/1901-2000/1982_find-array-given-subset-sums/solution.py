from typing import List, Optional
from collections import Counter


class Solution:
    def recoverArray(self, n: int, sums: List[int]) -> List[int]:
        sums = sorted(sums)
        res = []
        while len(sums) > 1:
            diff = sums[-1] - sums[-2]
            cnt = Counter(sums)
            left = []  # subset sums that do NOT use the candidate element
            right = []  # subset sums that DO use it
            for x in sums:
                if cnt[x]:
                    cnt[x] -= 1
                    left.append(x)
                    cnt[x + diff] -= 1
                    right.append(x + diff)
            if 0 in left:
                res.append(diff)
                sums = left
            else:
                res.append(-diff)
                sums = right
        return res
