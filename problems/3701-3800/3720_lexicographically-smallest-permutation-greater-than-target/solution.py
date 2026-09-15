from typing import List, Optional


class Solution:
    def lexGreaterPermutation(self, s: str, target: str) -> str:
        # Counts of the letters still unused while the built prefix keeps
        # matching target position by position.
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - ord("a")] += 1
        # The most recent position where a letter strictly greater than
        # target[i] was still available: that bump point plus the count
        # snapshot taken there is the best fallback completion.
        bump_at, bump_ch, bump_freq = -1, "", None
        for i, ch in enumerate(target):
            ci = ord(ch) - ord("a")
            for d in range(ci + 1, 26):
                if freq[d] > 0:
                    bump_at = i
                    bump_ch = chr(ord("a") + d)
                    bump_freq = freq[:]
                    break
            if freq[ci] == 0:
                break
            freq[ci] -= 1
        if bump_at < 0:
            return ""
        # Matched prefix, then the bump letter, then everything left in
        # ascending order — the smallest tail this multiset allows.
        freq = bump_freq
        freq[ord(bump_ch) - ord("a")] -= 1
        return target[:bump_at] + bump_ch + "".join(chr(ord("a") + d) * freq[d] for d in range(26))
