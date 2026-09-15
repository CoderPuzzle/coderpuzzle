from typing import List


class Solution:
    def countCharacters(self, words: List[str], chars: str) -> int:
        have = [0] * 26
        for ch in chars:
            have[ord(ch) - ord("a")] += 1
        total = 0
        for word in words:
            need = [0] * 26
            for ch in word:
                need[ord(ch) - ord("a")] += 1
            # Formable iff every letter requirement fits the budget; the
            # budget is per word, so `have` is never consumed.
            if all(have[i] >= need[i] for i in range(26)):
                total += len(word)
        return total
