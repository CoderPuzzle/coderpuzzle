from typing import List, Optional


class Solution:
    def differByOne(self, words: List[str]) -> bool:
        n = len(words)
        if n < 2:
            return False
        length = len(words[0])
        # Fix one position at a time; within that position, hash every word
        # with that single character masked out.
        for pos in range(length):
            seen = set()
            for word in words:
                masked = word[:pos] + "*" + word[pos + 1 :]
                # A repeat means two words agree everywhere except pos; since
                # every word is unique, they must differ there and nowhere else.
                if masked in seen:
                    return True
                seen.add(masked)
        return False
