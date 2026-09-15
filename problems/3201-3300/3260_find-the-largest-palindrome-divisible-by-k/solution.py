from typing import List


class Solution:
    def largestPalindrome(self, n: int, k: int) -> str:
        # A palindrome of length n is pinned down by its first ceil(n/2)
        # digits, and its remainder mod k is a digit-weight sum: half-position
        # j carries its own place value plus its mirror's (the odd-length
        # middle has no separate mirror), so everything runs on residues mod
        # k, never on the full number. For each suffix of the half, track
        # which residues the still-free digits can add; then scan the half
        # left to right, taking the largest digit whose leftover residue
        # stays reachable — the last free digit closes it exactly to zero.
        m = (n + 1) // 2
        pow_small = [1 % k] * m
        for j in range(1, m):
            pow_small[j] = pow_small[j - 1] * 10 % k
        base = 1 % k
        for _ in range(n - m):
            base = base * 10 % k
        weights = [(base * pow_small[m - 1 - j] + (pow_small[j] if 2 * j != n - 1 else 0)) % k for j in range(m)]
        full = (1 << k) - 1

        # reachable[j]: residues the free digits at half-positions j.. can
        # add. Sets only grow as positions free up and take at most k
        # distinct values, so each closure is cached by (set, weight).
        reachable = [0] * (m + 1)
        reachable[m] = 1
        cache = {}
        for j in range(m - 1, -1, -1):
            mask, w = reachable[j + 1], weights[j]
            key = mask * 10 + w
            if key not in cache:
                out = mask
                shift = 0
                for _ in range(9):
                    shift = (shift + w) % k
                    out |= mask if shift == 0 else ((mask << shift) | (mask >> (k - shift))) & full
                cache[key] = out
            reachable[j] = cache[key]

        need = 0
        half = []
        for j in range(m):
            low = 1 if j == 0 else 0
            w = weights[j]
            for d in range(9, low - 1, -1):
                rest = (need - d * w) % k
                if reachable[j + 1] >> rest & 1:
                    need = rest
                    half.append(d)
                    break
        body = half[:-1] if n % 2 else half
        return "".join(map(str, half + body[::-1]))
