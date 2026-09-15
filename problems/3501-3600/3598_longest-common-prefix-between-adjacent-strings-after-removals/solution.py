from typing import List


class Solution:
    def longestCommonPrefix(self, words: List[str]) -> List[int]:
        # Removing words[i] keeps every adjacent pair except (i-1, i) and
        # (i, i+1), and adds the single new pair (i-1, i+1). With
        # adj[j] = lcp(words[j], words[j+1]), the best surviving old pair
        # is the max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima
        # answer that in O(1) — so each answer is the max of the left
        # max, the right max, and that one new LCP.
        n = len(words)
        adj = [0] * max(n - 1, 0)
        for i in range(n - 1):
            limit = min(len(words[i]), len(words[i + 1]))
            j = 0
            while j < limit and words[i][j] == words[i + 1][j]:
                j += 1
            adj[i] = j

        pre = [0] * n  # pre[i] = max(adj[0..i-2]) — best pair fully left of i
        for i in range(2, n):
            pre[i] = max(pre[i - 1], adj[i - 2])
        suf = [0] * n  # suf[i] = max(adj[i+1..n-2]) — best pair fully right of i
        for i in range(n - 3, -1, -1):
            suf[i] = max(suf[i + 1], adj[i + 1])

        answer = [0] * n
        for i in range(n):
            best = max(pre[i], suf[i])
            if 0 < i < n - 1:
                limit = min(len(words[i - 1]), len(words[i + 1]))
                j = 0
                while j < limit and words[i - 1][j] == words[i + 1][j]:
                    j += 1
                best = max(best, j)
            answer[i] = best
        return answer
