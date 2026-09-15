from typing import List


class Solution:
    def removeAnagrams(self, words: List[str]) -> List[str]:
        result: List[str] = []
        prev = ""
        for word in words:
            signature = "".join(sorted(word))
            if signature != prev:
                result.append(word)
                prev = signature
        return result
