from typing import List


class Solution:
    def kthDistinct(self, arr: List[str], k: int) -> str:
        frequencies = {}
        for word in arr:
            frequencies[word] = frequencies.get(word, 0) + 1
        for word in arr:
            if frequencies[word] == 1:
                k -= 1
                if k == 0:
                    return word
        return ""
