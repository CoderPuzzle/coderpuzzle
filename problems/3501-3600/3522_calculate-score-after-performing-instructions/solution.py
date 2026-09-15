from typing import List


class Solution:
    def calculateScore(self, instructions: List[str], values: List[int]) -> int:
        # Each index executes at most once, so a linear walk with a visited
        # flag per index suffices: "add" contributes values[i] and steps to
        # i + 1, "jump" moves to i + values[i], and the process ends on any
        # out-of-bounds target or on an already-executed target (which is
        # not executed again). The score is returned as 64-bit: with n up
        # to 1e5 adds of magnitude up to 1e5, |score| can reach 1e10.
        n = len(instructions)
        executed = [False] * n
        score = 0
        i = 0
        while 0 <= i < n and not executed[i]:
            executed[i] = True
            if instructions[i] == "add":
                score += values[i]
                i += 1
            else:
                i += values[i]
        return score
