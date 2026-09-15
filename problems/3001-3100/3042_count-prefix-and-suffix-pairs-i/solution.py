from typing import List


class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        def is_prefix_and_suffix(str1: str, str2: str) -> bool:
            if len(str1) > len(str2):
                return False
            size1, size2 = len(str1), len(str2)
            for index in range(size1):
                if str1[index] != str2[index]:
                    return False
                if str1[index] != str2[size2 - size1 + index]:
                    return False
            return True

        total = 0
        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                if is_prefix_and_suffix(words[i], words[j]):
                    total += 1
        return total
