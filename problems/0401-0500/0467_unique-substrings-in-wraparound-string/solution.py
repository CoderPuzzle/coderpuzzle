class Solution:
    def findSubstringInWraproundString(self, s: str) -> int:
        # A substring of base is exactly a run of consecutive alphabet
        # letters, and a run is pinned by its last letter plus its length —
        # the characters before any ending position are forced. So best[c]
        # only needs to track the longest run ending at letter c.
        best = [0] * 26
        run = 0
        for i, ch in enumerate(s):
            # The run continues when ch is the alphabet successor of the
            # previous letter, wrapping z -> a; otherwise it restarts at 1.
            if i > 0 and (ord(s[i - 1]) - ord("a") + 1) % 26 == ord(ch) - ord("a"):
                run += 1
            else:
                run = 1
            j = ord(ch) - ord("a")
            if run > best[j]:
                best[j] = run
        # A run of length L ending at c contributes exactly its L suffixes,
        # all runs, all distinct; the max per letter keeps each once.
        return sum(best)
