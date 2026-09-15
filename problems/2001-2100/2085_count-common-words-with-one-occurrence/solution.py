from collections import Counter
from typing import List


class Solution:
    def countWords(self, words1: List[str], words2: List[str]) -> int:
        first = Counter(words1)
        second = Counter(words2)
        return sum(count == 1 and second[word] == 1 for word, count in first.items())
