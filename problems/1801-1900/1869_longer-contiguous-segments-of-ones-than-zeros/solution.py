class Solution:
    def checkZeroOnes(self, s: str) -> bool:
        # One pass tracks the current run; each character's best run is
        # folded in on change and once more after the loop. A digit that
        # never appears keeps its best at 0, per the statement's rule.
        best = {"1": 0, "0": 0}
        cur = 0
        prev = ""
        for ch in s + " ":
            if ch == prev:
                cur += 1
            else:
                if prev in best and cur > best[prev]:
                    best[prev] = cur
                cur = 1
                prev = ch
        return best["1"] > best["0"]
