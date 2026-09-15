class Solution:
    def lastNonEmptyString(self, s: str) -> str:
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        top = max(counts)
        taken = [False] * 26
        kept = []
        for ch in reversed(s):
            index = ord(ch) - ord("a")
            if counts[index] == top and not taken[index]:
                taken[index] = True
                kept.append(ch)
        return "".join(reversed(kept))
