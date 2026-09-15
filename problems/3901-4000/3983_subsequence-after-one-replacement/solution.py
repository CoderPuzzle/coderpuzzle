class Solution:
    def canMakeSubsequence(self, s: str, t: str) -> bool:
        m, n = len(s), len(t)
        pref = [n + 1] * (m + 1)
        pref[0] = 0
        for i in range(m):
            j = pref[i]
            while j < n and s[i] != t[j]:
                j += 1
            pref[i + 1] = j + 1 if j < n else n + 1
        if pref[m] <= n:
            return True

        suf = [-1] * (m + 1)
        suf[m] = n
        for i in range(m - 1, -1, -1):
            j = suf[i + 1] - 1
            while j >= 0 and s[i] != t[j]:
                j -= 1
            suf[i] = j

        return any(pref[i] < suf[i + 1] for i in range(m))
