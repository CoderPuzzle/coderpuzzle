class Solution:
    def minimumTimeToInitialState(self, word: str, k: int) -> int:
        n = len(word)
        fail = [0] * n
        length = 0
        for i in range(1, n):
            ch = word[i]
            while length and word[length] != ch:
                length = fail[length - 1]
            if word[length] == ch:
                length += 1
            fail[i] = length
        borders = bytearray(n + 1)
        cut = fail[n - 1]
        while cut:
            borders[cut] = 1
            cut = fail[cut - 1]
        t = 1
        while t * k < n and not borders[n - t * k]:
            t += 1
        return t
