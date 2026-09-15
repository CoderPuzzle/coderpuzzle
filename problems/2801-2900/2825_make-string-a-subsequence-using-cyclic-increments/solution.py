class Solution:
    def canMakeSubsequence(self, str1: str, str2: str) -> bool:
        # Walk str1 once with a pointer into str2. Whenever str2[j] equals
        # str1[i], or equals its cyclic successor, take the pair and advance
        # both pointers: claiming the earliest eligible slot never displaces
        # a better later choice, because everything that fits after it also
        # fits after any other valid pick. Matching all of str2 this way is
        # exactly the statement asked for.
        j = 0
        for ch in str1:
            if j < len(str2) and (ord(str2[j]) - ord(ch)) % 26 <= 1:
                j += 1
        return j == len(str2)
