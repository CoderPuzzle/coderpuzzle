from typing import List, Optional


class Solution:
    def generateString(self, str1: str, str2: str) -> str:
        # 'T' windows pin their characters outright: stamp str2 into each
        # one, refusing the instance when two stamps disagree.
        n, m = len(str1), len(str2)
        total = n + m - 1
        word = [None] * total
        covered = [False] * total
        for i in range(n):
            if str1[i] == "T":
                for j in range(m):
                    p = i + j
                    if word[p] is not None and word[p] != str2[j]:
                        return ""
                    word[p] = str2[j]
                    covered[p] = True
        # Every other position takes 'a', the smallest character available.
        for p in range(total):
            if word[p] is None:
                word[p] = "a"
        # Repair 'F' windows left to right: one that accidentally equals
        # str2 must differ somewhere, and bumping its rightmost free slot
        # from 'a' to 'b' is the smallest change that late in the string.
        target = list(str2)
        for i in range(n):
            if str1[i] == "F" and word[i : i + m] == target:
                j = i + m - 1
                while j >= i and covered[j]:
                    j -= 1
                if j < i:
                    return ""  # fully pinned window that still matches
                word[j] = "b"
        return "".join(word)
