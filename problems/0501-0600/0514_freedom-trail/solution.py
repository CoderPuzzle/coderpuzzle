from typing import List, Optional

from collections import defaultdict


class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        # Precompute each character's indices so every stage only considers
        # alignments that actually spell the current key character (never
        # empty because the key is guaranteed spellable).
        positions = defaultdict(list)
        for i, ch in enumerate(ring):
            positions[ch].append(i)
        # dp: ring index aligned at 12:00 -> min rotation steps so far
        dp = {0: 0}
        for ch in key:
            nxt = {}
            for j in positions[ch]:
                # Circular rotation cost between alignments i and j: the
                # shorter of the direct and wrap-around distances.
                best = min(dp[i] + min(abs(i - j), n - abs(i - j)) for i in dp)
                nxt[j] = best
            dp = nxt
        # Cheapest final alignment, plus one button press per key char.
        return min(dp.values()) + len(key)
