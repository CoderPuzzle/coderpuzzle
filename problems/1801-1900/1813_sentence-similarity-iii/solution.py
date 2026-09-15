class Solution:
    def areSentencesSimilar(self, sentence1: str, sentence2: str) -> bool:
        # The shorter word list must be covered by a common prefix plus a
        # common suffix of the longer one; whatever sits between them is
        # the inserted sentence.
        w1 = sentence1.split()
        w2 = sentence2.split()
        i = 0
        while i < len(w1) and i < len(w2) and w1[i] == w2[i]:
            i += 1
        j = 0
        while j < len(w1) - i and j < len(w2) - i and w1[-1 - j] == w2[-1 - j]:
            j += 1
        return i + j >= min(len(w1), len(w2))
