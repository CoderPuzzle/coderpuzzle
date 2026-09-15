from operator import add, ne


class Solution:
    def minimumChanges(self, s: str, k: int) -> int:
        n = len(s)
        # Proper divisors of every length L: 1 <= d < L. A part of length 1
        # has none, so every part of a valid partition has length >= 2.
        divisors = [[] for _ in range(n + 1)]
        for d in range(1, n // 2 + 1):
            for length in range(2 * d, n + 1, d):
                divisors[length].append(d)
        inf = float("inf")
        # cost[i][j]: min letter changes turning s[i..j] into a
        # semi-palindrome, minimized over its proper divisors d. For each d
        # the d repeating-pattern groups must each become a palindrome, and
        # a group costs one change per mismatched mirror pair.
        cost = [[0] * n for _ in range(n)]
        for i in range(n - 1):
            for j in range(i + 1, n):
                part = s[i : j + 1]
                best = inf
                for d in divisors[j - i + 1]:
                    changes = 0
                    for g in range(d):
                        col = part[g::d]
                        changes += sum(map(ne, col, reversed(col))) >> 1
                    if changes < best:
                        best = changes
                cost[i][j] = best
        # ways[i] for the current part count p: min changes splitting the
        # suffix s[i:] into p semi-palindrome parts. Transition: pick the
        # first part s[i..x] and add the (p - 1)-part cost of s[x + 1:].
        cur = [cost[i][n - 1] for i in range(n)]
        for parts in range(2, k + 1):
            prev, cur = cur, [inf] * n
            # First part s[i..x] needs x - i + 1 >= 2 and the remaining
            # suffix needs length >= 2 * (parts - 1): x <= n - 2*parts + 1.
            last_start = n - 2 * parts + 1
            for i in range(last_start):
                cur[i] = min(map(add, cost[i][i + 1 : last_start + 1], prev[i + 2 : last_start + 2]))
        return cur[0]
