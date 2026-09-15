from typing import List, Optional


class Solution:
    def customSortString(self, order: str, s: str) -> str:
        # How many of each letter s holds; the alphabet is a fixed
        # constant, so 26 slots replace a hash map.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        out = []
        # Emission pass 1: walk order itself, emitting each letter it
        # names as many times as s holds it. order's sequence IS the
        # relative order the answer must carry, so this prefix already
        # satisfies it; letters absent from s contribute nothing. The
        # zeroing doubles as a membership mark for pass 2.
        for ch in order:
            slot = ord(ch) - 97
            if counts[slot]:
                out.extend([ch] * counts[slot])
                counts[slot] = 0
        # Emission pass 2: leftovers. Letters order never mentions are
        # unconstrained, so the pinned form sends them to the tail in
        # their original s order — walk s and keep the still-counted.
        for ch in s:
            slot = ord(ch) - 97
            if counts[slot]:
                out.append(ch)
                counts[slot] -= 1
        return "".join(out)
