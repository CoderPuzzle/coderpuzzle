from typing import List


class Solution:
    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:
        result = []
        n = len(text)
        for i in range(n):
            for word in words:
                end = i + len(word)
                if end <= n and text[i:end] == word:
                    result.append([i, end - 1])
        result.sort()
        return result
