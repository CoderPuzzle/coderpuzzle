from typing import List


class Solution:
    def findTheString(self, lcp: List[List[int]]) -> str:
        # A real matrix is symmetric; reject fakes up front so only the
        # lower triangle needs checking later.
        if [list(col) for col in zip(*lcp)] != lcp:
            return ""
        n = len(lcp)
        # Positive entries weld indices into letter-equality classes:
        # word[i] == word[j] iff lcp[i][j] > 0. Flood-fill those classes.
        group = [-1] * n
        groups = 0
        for i in range(n):
            if group[i] < 0:
                group[i] = groups
                stack = [i]
                while stack:
                    u = stack.pop()
                    row = lcp[u]
                    for v in range(n):
                        if row[v] > 0 and group[v] < 0:
                            group[v] = groups
                            stack.append(v)
                groups += 1
        if groups > 26:
            return ""
        # Cross-class order is unconstrained, so the alphabetically
        # smallest candidate numbers the classes by first appearance.
        label = {}
        code = [0] * n
        nxt = 97
        for i, g in enumerate(group):
            c = label.get(g)
            if c is None:
                c = nxt
                label[g] = c
                nxt += 1
            code[i] = c
        # Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require
        # an exact match on every stored entry; a fabricated matrix fails
        # here even when its positivity structure looked consistent.
        below = [0] * (n + 1)  # row i+1; trailing slot stays 0
        for i in range(n - 1, -1, -1):
            ci = code[i]
            cur = [0] * (n + 1)
            target = lcp[i]
            for j in range(i, -1, -1):
                if code[j] == ci:
                    cur[j] = below[j + 1] + 1
                if cur[j] != target[j]:
                    return ""
            below = cur
        return "".join(map(chr, code))
