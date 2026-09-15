from typing import List, Optional


class Solution:
    def countSequences(self, nums: List[int], k: int) -> int:
        # Every element is 1..6, hence 5-smooth: val is always the rational
        # 2^a * 3^b * 5^c, and each action shifts the exponent triple by
        # +e, -e, or 0, where e is the element's own (2, 3, 5) split. A
        # sequence wins exactly when the final triple matches k's, so k
        # keeping any prime factor above 5 is an immediate 0.
        target = []
        for p in (2, 3, 5):
            e = 0
            while k % p == 0:
                k //= p
                e += 1
            target.append(e)
        if k != 1:
            return 0
        target = tuple(target)
        # Forward DP over the reachable triples. Every count is bounded by
        # the total sequence count 3^19 = 1,162,261,467, so the answer
        # fits in 32 bits (Python integers are exact regardless).
        dp = {(0, 0, 0): 1}
        for v in nums:
            e = []
            for p in (2, 3, 5):
                c = 0
                while v % p == 0:
                    v //= p
                    c += 1
                e.append(c)
            e = tuple(e)
            ndp = {}
            for key, wt in dp.items():
                # multiply by v, leave val alone, divide by v
                for d in (e, (0, 0, 0), (-e[0], -e[1], -e[2])):
                    nk = (key[0] + d[0], key[1] + d[1], key[2] + d[2])
                    ndp[nk] = ndp.get(nk, 0) + wt
            dp = ndp
        return dp.get(target, 0)
