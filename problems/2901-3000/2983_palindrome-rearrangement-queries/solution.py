from typing import List


class Solution:
    def canMakePalindromeQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
        n = len(s)
        half = n // 2
        # Packed prefix letter counts: field k (20 bits, letter k+'a') of
        # prefix[i] counts that letter in s[:i]. 20 bits holds any single
        # count (<= 10^5) and any six-prefix sum used below (< 6*10^5), so
        # fields never carry into each other and packed equality is
        # field-wise equality.
        step = [1 << (20 * k) for k in range(26)]
        prefix = [0] * (n + 1)
        for index, character in enumerate(s):
            prefix[index + 1] = prefix[index] + step[ord(character) - 97]
        # Mismatch prefix: mismatch[i] counts the pairs (x, n-1-x), x < i,
        # whose characters differ — pairs a query can only repair by
        # covering x, its mirror, or both with the intervals on their sides.
        mismatch = [0] * (half + 1)
        for x in range(half):
            mismatch[x + 1] = mismatch[x] + (s[x] != s[n - 1 - x])
        # Top bit of every packed field: set in the signed difference below
        # exactly when a field borrowed, i.e. some letter count went negative.
        top_bits = 0
        for k in range(26):
            top_bits |= 1 << (20 * k + 19)

        def outside(lo1, hi1, lo2, hi2):
            # Inclusive pieces of [lo1, hi1] that avoid [lo2, hi2].
            if lo1 > hi1:
                return
            if hi2 < lo1 or lo2 > hi1:
                yield lo1, hi1
            else:
                if lo1 < lo2:
                    yield lo1, lo2 - 1
                if hi2 < hi1:
                    yield hi2 + 1, hi1

        answer = []
        for a, b, c, d in queries:
            m1, m2 = n - 1 - b, n - 1 - a  # mirror of [a, b], right half
            f1, f2 = n - 1 - d, n - 1 - c  # mirror of [c, d], left half
            # Pairs covered on neither side must already match.
            bad = 0
            for lo, hi in outside(0, a - 1, f1, f2):
                bad += mismatch[hi + 1] - mismatch[lo]
            for lo, hi in outside(b + 1, half - 1, f1, f2):
                bad += mismatch[hi + 1] - mismatch[lo]
            if bad:
                answer.append(False)
                continue
            # Pool balance: A + F_L == B + F_R with A covering F_R, where A
            # and B are the intervals' letters and F_L / F_R the fixed
            # characters facing covered positions on the opposite side.
            x = prefix[b + 1] + prefix[c]
            y = prefix[a] + prefix[d + 1]
            z = prefix[b + 1] - prefix[a]
            for lo, hi in outside(f1, f2, a, b):
                x += prefix[hi + 1]
                y += prefix[lo]
            for lo, hi in outside(m1, m2, c, d):
                x += prefix[lo]
                y += prefix[hi + 1]
                z += prefix[lo] - prefix[hi + 1]
            answer.append(x == y and not z & top_bits)
        return answer
