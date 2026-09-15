from typing import List, Optional


class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        # One pointer per word: emit alternately while both words still
        # have characters, then append whichever tail remains.
        out = []
        i = j = 0
        while i < len(word1) and j < len(word2):
            out.append(word1[i])
            out.append(word2[j])
            i += 1
            j += 1
        out.append(word1[i:])
        out.append(word2[j:])
        return "".join(out)
