from typing import List


class Solution:
    def generateAbbreviations(self, word: str) -> List[str]:
        # Each position doubles the possibilities: fold the character into
        # the running count, or keep the letter and flush the count first.
        # The abbreviate branch is tried first, so the results come out in
        # the canonical order the statement pins.
        results: List[str] = []

        def walk(pos: int, prefix: str, count: int) -> None:
            if pos == len(word):
                results.append(prefix + (str(count) if count else ""))
                return
            # Abbreviate: extend the running count.
            walk(pos + 1, prefix, count + 1)
            # Keep: flush the pending count, then the letter.
            walk(pos + 1, prefix + (str(count) if count else "") + word[pos], 0)

        walk(0, "", 0)
        return results
