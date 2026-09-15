class Solution:
    def numberOfSpecialChars(self, word: str) -> int:
        # A letter is special iff both of its cases occur somewhere; mark
        # the two 26-slot case flags in one pass, then count full pairs.
        lower = [False] * 26
        upper = [False] * 26
        for ch in word:
            if ch.islower():
                lower[ord(ch) - ord("a")] = True
            else:
                upper[ord(ch) - ord("A")] = True
        return sum(lower[k] and upper[k] for k in range(26))
