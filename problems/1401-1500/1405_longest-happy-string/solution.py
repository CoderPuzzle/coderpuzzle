from typing import List, Optional


class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        counts = {"a": a, "b": b, "c": c}
        result = []
        while True:
            # most plentiful letter first: burning rare letters while a common
            # one dominates would strand it in a forced aaa/bbb/ccc run
            ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
            letter, remaining = ranked[0]
            if remaining == 0:
                break
            # head letter just placed twice -> switch to the runner-up; that
            # two-in-a-row check is the only rule needed (blocks stay <= 2)
            if len(result) >= 2 and result[-1] == letter and result[-2] == letter:
                letter, remaining = ranked[1]
                # only one letter left and it is already doubled: cap here
                # rather than emit a forbidden triple
                if remaining == 0:
                    break
            result.append(letter)
            counts[letter] -= 1
        return "".join(result)
