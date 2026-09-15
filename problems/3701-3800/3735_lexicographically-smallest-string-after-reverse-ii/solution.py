from typing import List, Optional


class Solution:
    def lexSmallest(self, s: str) -> str:
        n = len(s)
        # Double rolling hashes over s and over its reverse: each candidate
        # glues at most two slices of these two strings, so any candidate
        # prefix hashes in O(1) from the tables below. reverse(s[:k]) is the
        # slice of the reversed string at offset n-k; reverse(s[n-k:]) sits
        # at offset 0.
        r = s[::-1]
        m1, m2 = 1000000007, 998244353
        b1, b2 = 131, 137
        pw1 = [1] * (n + 1)
        pw2 = [1] * (n + 1)
        hs1 = [0] * (n + 1)
        hs2 = [0] * (n + 1)
        hr1 = [0] * (n + 1)
        hr2 = [0] * (n + 1)
        g1 = g2 = u1 = u2 = 0
        for i in range(n):
            v = ord(s[i]) - 96
            w = ord(r[i]) - 96
            g1 = (g1 * b1 + v) % m1
            g2 = (g2 * b2 + v) % m2
            u1 = (u1 * b1 + w) % m1
            u2 = (u2 * b2 + w) % m2
            pw1[i + 1] = pw1[i] * b1 % m1
            pw2[i + 1] = pw2[i] * b2 % m2
            hs1[i + 1] = g1
            hs2[i + 1] = g2
            hr1[i + 1] = u1
            hr2[i + 1] = u2

        def sub_s(l, length):
            return (
                (hs1[l + length] - hs1[l] * pw1[length]) % m1,
                (hs2[l + length] - hs2[l] * pw2[length]) % m2,
            )

        def sub_r(l, length):
            return (
                (hr1[l + length] - hr1[l] * pw1[length]) % m1,
                (hr2[l + length] - hr2[l] * pw2[length]) % m2,
            )

        def pref(kind, k, length):
            # Hash pair of a candidate's first `length` characters.
            # kind 0: reverse(s[:k]) + s[k:] -> r[n-k:n], then s[k:].
            # kind 1: s[:n-k] + reverse(s[n-k:]) -> s[:head], then r[0:k].
            if kind == 0:
                if length <= k:
                    return sub_r(n - k, length)
                a1, a2 = sub_r(n - k, k)
                c1, c2 = sub_s(k, length - k)
                e = length - k
            else:
                head = n - k
                if length <= head:
                    return sub_s(0, length)
                a1, a2 = sub_s(0, head)
                c1, c2 = sub_r(0, length - head)
                e = length - head
            return (
                (a1 * pw1[e] + c1) % m1,
                (a2 * pw2[e] + c2) % m2,
            )

        def char_at(kind, k, i):
            # Candidate character i, read straight off the definition:
            # kind 0 walks the reversed prefix backwards through s; past the
            # boundary both kinds continue with s at the same index.
            if kind == 0:
                return s[k - 1 - i] if i < k else s[i]
            head = n - k
            return s[i] if i < head else r[i - head]

        probe = min(n, 16)

        def beats(kind, k):
            # True when this candidate sorts strictly before the champion.
            # Exact probe first: most contenders differ within a few chars.
            for i in range(probe):
                a = char_at(kind, k, i)
                c = char_at(best_kind, best_k, i)
                if a != c:
                    return a < c
            # Indistinguishable near the front: settle the rest by hashed
            # longest-common-prefix binary search (probe chars already tie).
            lo, hi = probe, n
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if pref(kind, k, mid) == pref(best_kind, best_k, mid):
                    lo = mid
                else:
                    hi = mid - 1
            if lo == n:
                return False
            return char_at(kind, k, lo) < char_at(best_kind, best_k, lo)

        # Only candidates starting with the smallest letter can win.
        smallest = min(s)
        best_kind, best_k = 0, -1
        for i in range(n):
            if s[i] == smallest and (best_k < 0 or beats(0, i + 1)):
                best_kind, best_k = 0, i + 1
        if s[0] == smallest:
            for k in range(2, n + 1):
                if beats(1, k):
                    best_kind, best_k = 1, k
        # Materialize only the winning candidate.
        if best_kind == 0:
            return s[:best_k][::-1] + s[best_k:]
        return s[: n - best_k] + s[n - best_k :][::-1]
