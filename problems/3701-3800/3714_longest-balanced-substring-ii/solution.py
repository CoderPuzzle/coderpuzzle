from typing import List, Optional


class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        # Any single character is balanced, so with n >= 1 the answer is at
        # least 1.
        best = 1

        # Case 1 — one distinct letter: balance is vacuous over a run, so
        # track the longest run of equal neighbors.
        run = 1
        for i in range(1, n):
            run = run + 1 if s[i] == s[i - 1] else 1
            best = max(best, run)

        # Case 2 — two distinct letters x and y: walk the string ignoring the
        # third letter z, keeping the running difference of their counts. Two
        # positions sharing a difference enclose a stretch that balances the
        # pair. Each z restarts the scan (a window through it would carry a
        # third letter), so first-seen slots carry a version stamp that the
        # split bumps instead of clearing the arrays.
        for x in range(3):
            for y in range(x + 1, 3):
                z = 3 - x - y
                first = [-1] * (2 * n + 1)
                stamp = [-1] * (2 * n + 1)
                stamp[n], first[n] = 0, -1  # difference 0 precedes index 0
                version, d = 0, 0
                for i in range(n):
                    c = ord(s[i]) - 97
                    if c == z:
                        version += 1
                        d = 0
                        stamp[n], first[n] = version, i
                    else:
                        d += 1 if c == x else -1
                        v = d + n
                        if stamp[v] == version:
                            best = max(best, i - first[v])
                        else:
                            stamp[v], first[v] = version, i

        # Case 3 — all three letters: hash each prefix's signature
        # (count_b - count_a, count_c - count_a); equal signatures at two
        # prefixes mean the stretch between them changed all three counts by
        # the same amounts. The earliest index per signature maximizes length.
        sigs = {(0, 0): -1}
        ca = cb = cc = 0
        for i, ch in enumerate(s):
            if ch == "a":
                ca += 1
            elif ch == "b":
                cb += 1
            else:
                cc += 1
            sig = (cb - ca, cc - ca)
            j = sigs.get(sig)
            if j is None:
                sigs[sig] = i
            else:
                best = max(best, i - j)

        return best
