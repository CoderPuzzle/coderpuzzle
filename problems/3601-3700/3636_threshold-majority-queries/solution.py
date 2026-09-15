import math
from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def subarrayMajority(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums)
        # Rank-compress: "smallest value" becomes "smallest rank".
        values = sorted(set(nums))
        rank = {value: r for r, value in enumerate(values)}
        a = [rank[value] for value in nums]
        m = len(rank)
        # occ[r] lists the sorted positions of rank r, so any range frequency
        # is two binary searches.
        occ = [[] for _ in range(m)]
        for pos, x in enumerate(a):
            occ[x].append(pos)

        # Block size balancing the block-pair sweep against query fringes.
        b = max(1, n // math.isqrt(len(queries)))
        k = (n + b - 1) // b
        # top_f[i*k+j] / top_v[i*k+j]: highest frequency inside blocks i..j
        # and the smallest rank attaining it. One sweep per left block grows
        # the window additions-only, so counts never decrease and the mode
        # pair stays O(1) per element.
        top_f = [0] * (k * k)
        top_v = [0] * (k * k)
        for i in range(k):
            cnt = [0] * m
            mf, mv, pos = 0, 0, i * b
            for j in range(i, k):
                end = min((j + 1) * b, n)
                while pos < end:
                    x = a[pos]
                    c = cnt[x] + 1
                    cnt[x] = c
                    if c > mf:
                        mf, mv = c, x
                    elif c == mf and x < mv:
                        mv = x
                    pos += 1
                top_f[i * k + j] = mf
                top_v[i * k + j] = mv

        # The overall top element clears any threshold exactly when something
        # does, so every answer is that element's pair checked once.
        stamp = [0] * m
        freq = [0] * m
        token = 0
        seen = []
        out = []
        for l, r, t in queries:
            bl = l // b
            br = r // b
            if br - bl <= 1:
                # Range spans at most two blocks: count it directly.
                token += 1
                bf, bv = 0, 0
                for pos in range(l, r + 1):
                    x = a[pos]
                    if stamp[x] != token:
                        stamp[x] = token
                        c = freq[x] = 1
                    else:
                        c = freq[x] + 1
                        freq[x] = c
                    if c > bf:
                        bf, bv = c, x
                    elif c == bf and x < bv:
                        bv = x
            else:
                # Whole blocks give the base candidate; every distinct fringe
                # rank gets its exact range frequency from two binary searches
                # (its total count also spans the middle blocks, so fringe
                # counts alone can never prune it).
                idx = (bl + 1) * k + br - 1
                bf, bv = top_f[idx], top_v[idx]
                token += 1
                seen.clear()
                for pos in range(l, (bl + 1) * b):
                    x = a[pos]
                    if stamp[x] != token:
                        stamp[x] = token
                        seen.append(x)
                for pos in range(br * b, r + 1):
                    x = a[pos]
                    if stamp[x] != token:
                        stamp[x] = token
                        seen.append(x)
                for x in seen:
                    f = bisect_right(occ[x], r) - bisect_left(occ[x], l)
                    if f > bf or (f == bf and x < bv):
                        bf, bv = f, x
            out.append(values[bv] if bf >= t else -1)
        return out
