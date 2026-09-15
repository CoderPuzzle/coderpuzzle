from math import gcd
from typing import List


class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # Exclusive prefix/suffix folds: pre[i] folds nums[0..i-1] and
        # suf[i] folds nums[i..n-1] for both GCD (identity 0) and LCM
        # (identity 1). Removing index i leaves the fold of the two joins;
        # the full-array fold covers removing nothing, and removing every
        # element folds to score 0 through the identities. Every LCM of a
        # sub-multiset of values <= 30 divides LCM(1..30) = 2329089562800,
        # and the GCD is at most 30, so any factor score is at most
        # 2329089562800 * 30 = 6987268688400 < 2^63.
        n = len(nums)
        pre_g, pre_l = [0] * (n + 1), [1] * (n + 1)
        suf_g, suf_l = [0] * (n + 1), [1] * (n + 1)
        for i in range(n):
            pre_g[i + 1] = gcd(pre_g[i], nums[i])
            pre_l[i + 1] = pre_l[i] // gcd(pre_l[i], nums[i]) * nums[i]
        for i in range(n - 1, -1, -1):
            suf_g[i] = gcd(suf_g[i + 1], nums[i])
            suf_l[i] = suf_l[i + 1] // gcd(suf_l[i + 1], nums[i]) * nums[i]
        best = pre_g[n] * pre_l[n]
        for i in range(n):
            g = gcd(pre_g[i], suf_g[i + 1])
            l = pre_l[i] // gcd(pre_l[i], suf_l[i + 1]) * suf_l[i + 1]
            best = max(best, g * l)
        return best
