class Solution:
    def calculateScore(self, s: str) -> int:
        # One stack of unmarked indices per letter: the closest unmarked
        # mirror candidate is always the most recently pushed one.
        stacks = [[] for _ in range(26)]
        score = 0
        for i, ch in enumerate(s):
            c = ord(ch) - ord("a")
            mirror = stacks[25 - c]
            if mirror:
                # Match with the nearest unmarked mirror and mark both.
                score += i - mirror.pop()
            else:
                stacks[c].append(i)
        return score
