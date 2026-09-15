class Solution:
    def sortSentence(self, s: str) -> str:
        # The trailing digit is the 1-indexed slot; drop each word into its
        # slot and rejoin.
        words = s.split()
        out = [""] * len(words)
        for w in words:
            out[int(w[-1]) - 1] = w[:-1]
        return " ".join(out)
