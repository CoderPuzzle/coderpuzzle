class Solution:
    def minimumTimeToInitialState(self, word: str, k: int) -> int:
        # After t seconds exactly t*k original characters have been removed
        # from the front; additions only ever land behind the survivors.
        # The word reverts iff nothing survives (t*k >= n) or the surviving
        # suffix word[t*k:] equals the prefix it would occupy.
        n = len(word)
        t = 1
        while t * k < n and word[: n - t * k] != word[t * k :]:
            t += 1
        return t
