from typing import List, Optional


class Solution:
    def perfectPairs(self, nums: List[int]) -> int:
        # Signs never matter: with x = |a| <= y = |b| a pair is perfect
        # exactly when y <= 2x, so work in sorted absolute values and
        # count, for each i, the later entries within double of a[i].
        a = sorted(abs(v) for v in nums)
        # The doubled bound 2 * a[i] never shrinks as i moves right, so
        # the frontier j only ever advances; positions strictly between
        # i and j pair with i.
        ans = 0
        j = 0
        for i, x in enumerate(a):
            while j < len(a) and a[j] <= 2 * x:
                j += 1
            ans += j - i - 1
        return ans
