class Solution:
    def minimumScore(self, s: str, t: str) -> int:
        # Removing scattered characters only charges their two extreme
        # indices, so any optimal selection widens to one contiguous
        # block [i, j): padding it never raises the score, and dropping
        # more kept characters can only help the subsequence check.
        # Greedy walks pin how far each flank reaches into s. pre[i] is
        # the earliest end in s of a match of t[:i] (-1 marks the empty
        # prefix) and stays finite up to L; suf[j] is the latest start
        # of a backward match of t[j:] and stays finite from Rsuf. The
        # block works iff pre[i] < suf[j]; pre rises with i and the
        # smallest feasible j rises with it, so one forward pointer
        # prices every split. Edge windows (drop whole tail/head/all)
        # are the candidates j = m and i = 0 and fall out of the same
        # sentinels.
        n, m = len(s), len(t)
        pre = [-1] * (m + 1)
        j = 0
        L = 0
        for i in range(1, m + 1):
            while j < n and s[j] != t[i - 1]:
                j += 1
            if j == n:
                break
            pre[i] = j
            j += 1
            L = i
        if L == m:
            return 0
        suf = [0] * (m + 1)
        j = n - 1
        Rsuf = m
        for k in range(m - 1, -1, -1):
            while j >= 0 and s[j] != t[k]:
                j -= 1
            if j < 0:
                break
            suf[k] = j
            j -= 1
            Rsuf = k
        ans = m - L
        if Rsuf < ans:
            ans = Rsuf
        p = 1
        for i in range(L + 1):
            if p < i + 1:
                p = i + 1
            if p < Rsuf:
                p = Rsuf
            while p < m and suf[p] <= pre[i]:
                p += 1
            if p < m and p - i < ans:
                ans = p - i
        return ans
