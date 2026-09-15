from typing import List, Optional


class Solution:
    def maxSubarrays(self, n: int, conflictingPairs: List[List[int]]) -> int:
        # bucket each pair at its smaller element; g[a] collects the larger endpoints
        g = [[] for _ in range(n + 1)]
        for a, b in conflictingPairs:
            if a > b:
                a, b = b, a
            g[a].append(b)
        cnt = [0] * (n + 2)
        ans = add = 0
        b1 = b2 = n + 1
        # sweep left endpoints right to left; b1, b2 are the smallest and
        # second-smallest right endpoint among pairs whose smaller side is >= a
        for a in range(n, 0, -1):
            for b in g[a]:
                if b < b1:
                    b2, b1 = b1, b
                elif b < b2:
                    b2 = b
            # a subarray starting at a stays valid up to just before b1
            ans += b1 - a
            # removing the pair that uniquely supplies b1 relaxes its bound to
            # b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
            cnt[b1] += b2 - b1
            if cnt[b1] > add:
                add = cnt[b1]
        ans += add
        return ans
