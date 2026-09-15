class Solution:
    def countLetters(self, s: str) -> int:
        total = 0
        run = 0
        prev = ""
        for ch in s:
            # Extend the current uniform run, or start a new one; adding
            # the run length each step sums L(L+1)/2 per maximal run.
            if ch == prev:
                run += 1
            else:
                run = 1
                prev = ch
            total += run
        return total
