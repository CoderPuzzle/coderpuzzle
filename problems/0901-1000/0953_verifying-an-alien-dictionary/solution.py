from typing import List, Optional


class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        # Rank of every letter under the alien alphabet.
        rank = {letter: index for index, letter in enumerate(order)}
        # Adjacent pairs decide the whole list: any out-of-order pair
        # falsifies it, and each pair's verdict is final.
        for first, second in zip(words, words[1:]):
            for a, b in zip(first, second):
                if a != b:
                    # The first differing position is the only one that
                    # orders this pair; the left word must lose it.
                    if rank[a] > rank[b]:
                        return False
                    break
            else:
                # One word is a prefix of the other: the shorter is the
                # smaller, so only the left word may be short.
                if len(first) > len(second):
                    return False
        return True
