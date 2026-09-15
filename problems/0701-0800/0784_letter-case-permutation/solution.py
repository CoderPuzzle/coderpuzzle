from typing import List, Optional


class Solution:
    def letterCasePermutation(self, s: str) -> List[str]:
        # Interleaved list-doubling: scan s left to right; at each letter
        # every string built so far is immediately followed by its copy
        # with that one letter's case flipped.
        result = [s]
        for i, ch in enumerate(s):
            if not ("a" <= ch <= "z" or "A" <= ch <= "Z"):
                continue
            flipped = chr(ord(ch) ^ 0x20)
            grown = []
            for current in result:
                grown.append(current)
                grown.append(current[:i] + flipped + current[i + 1 :])
            result = grown
        return result
