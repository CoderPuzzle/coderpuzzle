class Solution:
    def maxRepeating(self, sequence: str, word: str) -> int:
        # word is k-repeating exactly when some window of sequence is
        # tiled by k back-to-back copies of word — no overlap, no gap.
        # Scan start positions right to left: run[i] is the number of
        # copies in the longest tiling beginning at i, so a match at i
        # gives run[i] = run[i + m] + 1; the answer is the maximum run.
        # A self-overlapping word such as "aa" cannot chain through the
        # overlap, and scattered matches never tile into one block.
        n, m = len(sequence), len(word)
        run = [0] * (n + 1)
        best = 0
        for i in range(n - 1, -1, -1):
            if sequence[i : i + m] == word:
                run[i] = run[i + m] + 1
                if run[i] > best:
                    best = run[i]
        return best
