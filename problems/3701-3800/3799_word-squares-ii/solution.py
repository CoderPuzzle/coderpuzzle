from typing import List


class Solution:
    def wordSquares(self, words: List[str]) -> List[List[str]]:
        by_first: dict = {}
        by_last: dict = {}
        for word in words:
            by_first.setdefault(word[0], []).append(word)
            by_last.setdefault(word[3], []).append(word)
        res: List[List[str]] = []
        for top in sorted(words):
            for left in by_first.get(top[0], []):
                if left == top:
                    continue
                for right in by_first.get(top[3], []):
                    if right == top or right == left:
                        continue
                    for bottom in by_last.get(right[3], []):
                        if bottom[0] != left[3]:
                            continue
                        if bottom == top or bottom == left or bottom == right:
                            continue
                        res.append([top, left, right, bottom])
        res.sort()
        return res
