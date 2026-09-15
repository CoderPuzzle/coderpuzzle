from typing import List, Optional


class Solution:
    def countSubstrings(self, s: str) -> int:
        digits = [ord(c) - 48 for c in s]
        total = 0
        # One independent pass per candidate last digit d; the passes sum.
        # cnt[r] counts suffixes of the already-processed prefix whose value
        # is congruent to r modulo d.
        for d in range(1, 10):
            cnt = [0] * d
            for di in digits:
                # Extending a suffix of remainder r by this digit d yields
                # r*10 + d, divisible exactly when (r * 10) % d == 0; the +1
                # covers the single-character substring "d".
                if di == d:
                    for r in range(d):
                        if (r * 10) % d == 0:
                            total += cnt[r]
                    total += 1
                # Remap every suffix: appending di sends remainder r to
                # (10*r + di) % d, and di alone starts a fresh suffix.
                new_cnt = [0] * d
                for r in range(d):
                    if cnt[r]:
                        new_cnt[(r * 10 + di) % d] += cnt[r]
                new_cnt[di % d] += 1
                cnt = new_cnt
        return total
