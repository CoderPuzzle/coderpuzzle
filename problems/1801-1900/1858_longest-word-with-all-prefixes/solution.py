class Solution:
    def longestWord(self, words: List[str]) -> str:
        # A word qualifies iff every proper prefix chain is present. Sort
        # once; the first qualifying word of each new record length wins,
        # and lexicographic order breaks length ties for free.
        word_set = set(words)
        best = ""
        for w in sorted(word_set):
            if len(w) > len(best) and all(w[:i] in word_set for i in range(1, len(w))):
                best = w
        return best
