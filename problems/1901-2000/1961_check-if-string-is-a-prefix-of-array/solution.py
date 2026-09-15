from typing import List


class Solution:
    def isPrefixString(self, s: str, words: List[str]) -> bool:
        # Match each word in order against the front of s: a prefix string is
        # exactly the concatenation of some first-k words, so once s is fully
        # consumed by exact word matches it must be one.
        i = 0
        for word in words:
            if s[i : i + len(word)] != word:
                return False
            i += len(word)
            if i == len(s):
                return True
        return False
