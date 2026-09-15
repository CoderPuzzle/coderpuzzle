from collections import Counter
from typing import List


class Solution:
    def getLargestOutlier(self, nums: List[int]) -> int:
        # With specials summing to S and outlier o, the array total is
        # 2*S + o (hint 1), so a candidate outlier c is potential exactly
        # when total - c is even and s = (total - c) / 2 occurs at another
        # index — two copies when s equals c (hint 2). Values are bounded
        # (+/-1000, n <= 10^5), so the total's magnitude stays <= 10^8,
        # comfortably inside 32-bit range.
        total = sum(nums)
        count = Counter(nums)
        best = -2000  # strictly below every legal value
        for c in nums:
            rest = total - c
            if rest % 2:
                continue
            s = rest // 2
            need = 2 if s == c else 1
            if count.get(s, 0) >= need and c > best:
                best = c
        return best
