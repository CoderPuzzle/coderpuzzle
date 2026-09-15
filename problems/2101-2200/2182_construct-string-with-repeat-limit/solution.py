class Solution:
    def repeatLimitedString(self, s: str, repeatLimit: int) -> str:
        # Greedy: always emit the largest letter still available. If it
        # just exhausted its allowed run, spend one unit of the next
        # largest as a separator, then resume. When nothing smaller
        # remains, the leftover of the big letter is dropped.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        out = []
        i = 25
        while True:
            while i >= 0 and counts[i] == 0:
                i -= 1
            if i < 0:
                break
            run = min(repeatLimit, counts[i])
            out.append(chr(ord("a") + i) * run)
            counts[i] -= run
            if counts[i] == 0:
                continue
            j = i - 1
            while j >= 0 and counts[j] == 0:
                j -= 1
            if j < 0:
                break
            out.append(chr(ord("a") + j))
            counts[j] -= 1
        return "".join(out)
