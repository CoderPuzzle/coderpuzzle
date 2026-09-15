from typing import List


class Solution:
    def findOcurrences(self, text: str, first: str, second: str) -> List[str]:
        words = text.split(" ")
        thirds: List[str] = []
        # Bounding at len(words) - 2 guarantees words[i + 2] always exists,
        # so a bigram landing on the last two words is never inspected.
        for i in range(len(words) - 2):
            if words[i] == first and words[i + 1] == second:
                thirds.append(words[i + 2])
        return thirds
