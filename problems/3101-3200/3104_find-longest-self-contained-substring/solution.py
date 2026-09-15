from typing import List


class Solution:
    def maxSubstringLength(self, s: str) -> int:
        n = len(s)
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i

        # Prefix counts make "does letter d occur inside s[l..r]" a plain
        # count difference, which drives both the closure cascade and the
        # final validation.
        counts = [[0] * 26]
        base = ord("a")
        for ch in s:
            row = counts[-1][:]
            row[ord(ch) - base] += 1
            counts.append(row)

        def stabilize(l, r):
            # Extend the right end until every letter occurring inside
            # s[l..r] is fully contained there; report the fixpoint along
            # with the earliest first occurrence seen among its letters.
            while True:
                new_r = r
                min_first = n
                for d in range(26):
                    if counts[r + 1][d] - counts[l][d] > 0:
                        letter = d + base
                        if last[chr(letter)] > new_r:
                            new_r = last[chr(letter)]
                        if first[chr(letter)] < min_first:
                            min_first = first[chr(letter)]
                if new_r == r:
                    return r, min_first
                r = new_r

        best = -1
        # A self-contained window always starts at the first occurrence of
        # its own leading character, so only those positions are anchors.
        for l in sorted(first.values()):
            r = last[s[l]]
            while True:
                r, min_first = stabilize(l, r)
                if min_first >= l and not (l == 0 and r == n - 1):
                    length = r - l + 1
                    if length > best:
                        best = length
                if r == n - 1:
                    break
                # Absorb the block starting right after the fixpoint
                # wholesale and re-stabilize: unions of consecutive
                # closed blocks that stay self-contained surface as
                # further fixpoints on this monotone chain.
                r = last[s[r + 1]]

        return best
