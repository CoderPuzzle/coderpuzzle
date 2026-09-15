from typing import List, Optional


class Solution:
    def lexPalindromicPermutation(self, s: str, target: str) -> str:
        n = len(s)
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - ord("a")] += 1
        # Parity law: every count even, or exactly one odd count absorbed by
        # the middle character when n is odd.
        odds, odd_letter = 0, -1
        for d in range(26):
            if freq[d] % 2 == 1:
                odds += 1
                odd_letter = d
        if odds != n % 2:
            return ""
        # The half multiset is forced — freq[d] // 2 of every letter — and on
        # odd lengths the odd letter pins the middle, so comparing palindromes
        # reduces to comparing (half, middle, mirrored half).
        half = [f // 2 for f in freq]
        m = n // 2
        p = target[:m]

        def counts_of(w):
            cw = [0] * 26
            for ch in w:
                cw[ord(ch) - ord("a")] += 1
            return cw

        # Candidate 1: keep the half equal to target's own first half p. That
        # pins the entire palindrome, which qualifies only if it already
        # clears target past the shared prefix.
        best = None
        if counts_of(p) == half:
            suffix = target[m + (n % 2) :]
            mirrored = p[::-1]
            if n % 2 == 0:
                wins = mirrored > suffix
            else:
                mid = ord(target[m]) - ord("a")
                wins = odd_letter > mid or (odd_letter == mid and mirrored > suffix)
            if wins:
                best = p
        # Candidate 2: the smallest half arrangement strictly greater than p —
        # match p as far as possible, remembering the latest position where a
        # larger still-available letter existed, and fall back to it.
        if best is None:
            cur = half[:]
            bump_at, bump_ch, bump_cur = -1, -1, None
            for i, ch in enumerate(p):
                ci = ord(ch) - ord("a")
                for d in range(ci + 1, 26):
                    if cur[d] > 0:
                        bump_at, bump_ch, bump_cur = i, d, cur[:]
                        break
                if cur[ci] == 0:
                    break
                cur[ci] -= 1
            if bump_at >= 0:
                bump_cur[bump_ch] -= 1
                tail = "".join(chr(ord("a") + d) * bump_cur[d] for d in range(26))
                best = p[:bump_at] + chr(ord("a") + bump_ch) + tail
        if best is None:
            return ""
        result = best
        if n % 2 == 1:
            result += chr(ord("a") + odd_letter)
        return result + best[::-1]
