class Solution:
    def minimumGroups(self, words: list[str]) -> int:
        def booth(s):
            if not s:
                return s
            z = s + s
            n = len(s)
            i, j, k = 0, 1, 0
            while i < n and j < n and k < n:
                if z[i + k] == z[j + k]:
                    k += 1
                    continue
                if z[i + k] > z[j + k]:
                    i = i + k + 1
                    i += i == j
                else:
                    j = j + k + 1
                    j += i == j
                k = 0
            p = min(i, j)
            return z[p : p + n]

        return len({(booth(w[::2]), booth(w[1::2])) for w in words})
